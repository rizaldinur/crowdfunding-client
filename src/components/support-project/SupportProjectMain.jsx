import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { NumericFormat } from "react-number-format";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

function SupportProjectMain() {
  const [amount, setAmount] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Grid container gap={2} sx={{ justifyContent: "center", py: 5 }}>
        <Grid size={{ xs: 12, sm: 6 }} sx={{ order: { xs: 1, sm: 0 } }}>
          <Card>
            <CardHeader
              title={<Typography variant="h5">Dukung Proyek</Typography>}
            />
            <CardContent>
              <NumericFormat
                customInput={TextField}
                label="Jumlah dukungan"
                prefix="Rp"
                value={amount}
                autoFocus
                error={!amount ? false : amount < 10000}
                helperText="Minimal Rp10.000"
                fullWidth
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                onValueChange={(values) => {
                  setAmount(values.floatValue);
                }}
              />
              <Button
                sx={{ mt: 4 }}
                variant="contained"
                fullWidth
                disabled={!amount || amount < 10000}
                onClick={() => {
                  let to = location.pathname + "/overview";
                  navigate(to, {
                    state: {
                      amount,
                    },
                  });
                }}
              >
                Lanjutkan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 5 }} sx={{ order: { xs: 0, sm: 1 } }}>
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ p: 2, bgcolor: yellow["100"] }}
            >
              Penting!
            </Typography>
            <Box component="ul" sx={{ color: "text.primary" }}>
              <li>
                <ListItemText
                  primary="Ruang Modal menghubungkan kreator dengan investor"
                  slotProps={{ primary: { variant: "body2" } }}
                />
              </li>
              <li>
                <ListItemText
                  primary=" Benefit tidak terjamin, tapi kreator tetap harus update
                              perkembangan proyeknya"
                  slotProps={{ primary: { variant: "body2" } }}
                />
              </li>
              <li>
                <ListItemText
                  primary="Dana diteruskan ke kreator hanya jika target pendanaan terpenuhi"
                  slotProps={{ primary: { variant: "body2" } }}
                />
              </li>
              <li>
                <ListItemText
                  primary="Jika target tidak tercapai, dana akan dikembalikan sepenuhnya"
                  slotProps={{ primary: { variant: "body2" } }}
                />
              </li>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SupportProjectMain;

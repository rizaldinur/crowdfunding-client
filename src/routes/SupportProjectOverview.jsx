import { Link as RouterLink, useLocation } from "react-router";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { numericFormatter } from "react-number-format";
import { yellow } from "@mui/material/colors";
import { useEffect, useState } from "react";

function SupportProjectOverview() {
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    document.title = "Ringkasan dukungan";
  }, []);

  return (
    <>
      <AuthNav />
      <Container maxWidth="md">
        <Stack gap={2} sx={{ color: "text.primary", py: 10 }}>
          <Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3">Ringkasan</Typography>
              <Button
                startIcon={<ChevronLeft />}
                variant="outlined"
                color="inherit"
                component={Link}
                href="."
              >
                Kembali
              </Button>
            </Stack>
            <Typography>
              Kami akan mengirimkan email konfirmasi ke{" "}
              <strong>johndoe@gmail.com</strong> saat proyek sukses mencapai
              target pendanaan.
            </Typography>
          </Stack>
          <img
            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            width="100%"
            height="250px"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <Stack gap={1}>
            <Link variant="h5" underline="always" color="textPrimary">
              Proyek Tanpa Nama
            </Link>
            <Typography color="primary" variant="body2">
              70% dana terkumpul
            </Typography>
            <Typography variant="body2">Oleh Kreator Proyek</Typography>
          </Stack>
          <Stack gap={1}>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" fontWeight={700}>
                Jumlah Dukungan
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {numericFormatter("10000", {
                  decimalSeparator: ",",
                  prefix: "Rp",
                  thousandSeparator: ".",
                })}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1} sx={{ p: 2, color: "black", bgcolor: yellow["100"] }}>
            <Typography variant="h6" fontWeight={700}>
              Keuntungan tidak terjamin
            </Typography>
            <Typography variant="body2">
              Kamu adalah <strong>investor</strong>. Potensi keuntungan yang
              ditawarkan murni bergantung pada bagaimana kreator menjalankan dan
              merealisasikan proyek kreatifnya.
            </Typography>
          </Stack>
          <FormControlLabel
            control={<Checkbox />}
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
            label="Saya memahami dan menerima seluruh risiko dalam memberikan dukungan"
            labelPlacement="end"
          />
          <Button disabled={!checked} variant="contained">
            Dukung sekarang
          </Button>
        </Stack>
      </Container>
      <MainFooter borderTop />
    </>
  );
}

export default SupportProjectOverview;

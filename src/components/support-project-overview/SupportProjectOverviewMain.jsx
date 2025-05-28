import { ChevronLeft } from "@mui/icons-material";
import { Link as RouterLink, useLocation, useParams } from "react-router";
import {
  Button,
  Link,
  Divider,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useContext, useState } from "react";
import { numericFormatter } from "react-number-format";
import { SupportOverviewContext } from "../../routes/SupportProjectOverview";

function SupportProjectOverviewMain({ data = {} }) {
  const { backLink, amount, loading } = useContext(SupportOverviewContext);
  const [checked, setChecked] = useState(false);
  const params = useParams();
  return (
    <Container maxWidth="md">
      <Stack gap={2} sx={{ color: "text.primary", py: 10 }}>
        <Stack gap={1}>
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
              component={RouterLink}
              to={backLink}
            >
              Kembali
            </Button>
          </Stack>
          <Typography>
            Kami akan mengirimkan email konfirmasi ke{" "}
            <strong>{data.supporterEmail || "johndoe@gmail.com"}</strong> saat
            proyek sukses mencapai target pendanaan.
          </Typography>
        </Stack>
        <img
          src={
            data.imageUrl ||
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
          width="100%"
          height="250px"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <Stack gap={1}>
          <Link
            variant="h5"
            underline="always"
            color="textPrimary"
            href={`/project/details/${params.profileId}/${params.projectId}`}
          >
            {data.title || "Proyek Tanpa Nama"}
          </Link>
          <Typography color="primary" variant="body2">
            {data.fundingProgress >= 0 ? data.fundingProgress : "70"}% dana
            terkumpul
          </Typography>
          <Typography variant="body2">
            Oleh {data.creatorName || "Kreator Proyek"}
          </Typography>
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
              {numericFormatter(amount.toString() || "10000", {
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
        <Button
          loading={loading}
          disabled={!checked}
          variant="contained"
          type="submit"
          form="formSupportProject"
          // onClick={() => {
          //   window.snap.pay("token");
          // }}
        >
          Dukung sekarang
        </Button>
      </Stack>
    </Container>
  );
}

export default SupportProjectOverviewMain;

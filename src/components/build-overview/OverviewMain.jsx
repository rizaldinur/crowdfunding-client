import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router";
import CircularProgressWithLabel from "../progress/CircularProgressWithLabel";
import { Timer } from "@mui/icons-material";

function OverviewMain() {
  const location = useLocation();
  const buildLocation =
    location.pathname.split("/").slice(0, -1).join("/") + "/edit";
  console.log(buildLocation);

  return (
    <Container maxWidth="md" sx={{ color: "text.primary", mt: 4 }}>
      <Typography variant="h5">Ringkasan Draf Proyek</Typography>
      <Box sx={{ mt: 3 }}>
        <Stack
          direction="row"
          component={RouterLink}
          to={buildLocation + "/basic"}
          alignItems="center"
          gap={2}
          sx={{
            textDecoration: "none",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
            color: "text.primary",
          }}
        >
          <CircularProgressWithLabel value={75} />
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Dasar
            </Typography>
            <Typography variant="body2">
              Tentukan nama proyek, upload gambar utama proyek, dan detail
              selainnya tentang kampanye proyekmu.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          component={RouterLink}
          to={buildLocation + "/story"}
          gap={2}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CircularProgressWithLabel value={75} />
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Cerita
            </Typography>
            <Typography variant="body2">
              Deskripsikan proyek secara detail, keuntungan apa saja yang kamu
              tawarkan kepada investor, serta jelaskan potensi risiko dan
              tantangan.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          component={RouterLink}
          to={buildLocation + "/profile"}
          gap={2}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CircularProgressWithLabel value={75} />
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Profil
            </Typography>
            <Typography variant="body2">
              Edit profil yang akan ditampilkan di halaman proyek.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          component={RouterLink}
          to={buildLocation + "/payment"}
          gap={2}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CircularProgressWithLabel value={75} />
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Pembayaran
            </Typography>
            <Typography variant="body2">
              Verifikasi akun tujuan pengiriman dana proyek terkumpul. Proses
              ini memakan waktu 1x24 jam. Jika melebihi, tolong{" "}
              <Link>hubungi kami.</Link>
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="start" gap={1} sx={{ p: 3 }}>
          <Typography variant="body2">
            Jika sudah melengkapi semua detail informasi tentang proyekmu,
            submit proyekmu untuk ditinjau.
          </Typography>
          <Button variant="contained" disabled>
            Submit proyek
          </Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <Avatar>
            <Timer />
          </Avatar>
          <Stack>
            <Typography variant="h6" fontWeight={700}>
              Tinjau proyek
            </Typography>
            <Typography variant="body2">
              Kami akan meninjau proyek untuk memastikan jika memenuhi syarat
              dan ketentuan kami. Mohon tunggu 1-3 hari untuk mendapat respon
              dari kami. Jika melebihi, tolong <Link>hubungi kami.</Link>
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="start" gap={1} sx={{ p: 3 }}>
          <Typography variant="body2">Luncurkan proyekmu!</Typography>
          <Button variant="contained" disabled>
            luncurkan
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default OverviewMain;

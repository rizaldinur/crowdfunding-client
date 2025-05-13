import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import CircularProgressWithLabel from "../progress/CircularProgressWithLabel";
import { DoneAll, Timer } from "@mui/icons-material";
import { useMemo } from "react";

function OverviewMain({ data }) {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const buildLocation = useMemo(() => {
    let basePath = `/${params.profileId}/${params.projectId}/build`;
    return basePath;
  }, [location]);

  return (
    <Container maxWidth="md" sx={{ color: "text.primary", mt: 4 }}>
      <Typography variant="h5">Ringkasan Draf Proyek</Typography>
      <Box sx={{ mt: 3 }}>
        <Stack
          direction="row"
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
          <CircularProgressWithLabel value={data.basicProgress} />
          <Stack>
            <Link
              variant="h6"
              fontWeight={700}
              underline="hover"
              color="textPrimary"
              component={RouterLink}
              to={buildLocation + "/basic"}
            >
              Dasar
            </Link>
            <Typography variant="body2">
              Tentukan nama proyek, upload gambar utama proyek, dan detail
              selainnya tentang kampanye proyekmu.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CircularProgressWithLabel value={data.storyProgress} />
          <Stack>
            <Link
              variant="h6"
              underline="hover"
              color="textPrimary"
              fontWeight={700}
              component={RouterLink}
              to={buildLocation + "/story"}
            >
              Cerita
            </Link>
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
          gap={2}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CircularProgressWithLabel value={data.profileProgress} />
          <Stack>
            <Link
              variant="h6"
              underline="hover"
              color="textPrimary"
              fontWeight={700}
              component={RouterLink}
              to={buildLocation + "/profile"}
            >
              Profil
            </Link>
            <Typography variant="body2">
              Edit profil yang akan ditampilkan di halaman proyek.
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          sx={{
            textDecoration: "none",
            color: "text.primary",
            p: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <CircularProgressWithLabel value={data.paymentProgress} />
          <Stack>
            <Link
              variant="h6"
              underline="hover"
              color="textPrimary"
              component={RouterLink}
              to={buildLocation + "/payment"}
              fontWeight={700}
            >
              Pembayaran
            </Link>
            <Typography variant="body2">
              Verifikasi akun tujuan pengiriman dana proyek yang sudah
              terkumpul. Proses ini memakan waktu 1x24 jam. Jika melebihi,
              tolong{" "}
              <Link href="/" underline="hover" color="secondary">
                hubungi kami.
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="start" gap={1} sx={{ p: 3 }}>
          <Typography variant="body2">
            Jika sudah melengkapi semua detail informasi tentang proyekmu,
            submit proyekmu untuk ditinjau.
          </Typography>
          {data.buildStatus === "draft" && (
            <Button
              variant="contained"
              disabled={
                data.basicProgress !== 100 ||
                data.storyProgress !== 100 ||
                data.profileProgress !== 100 ||
                data.paymentProgress !== 100
              }
            >
              Submit proyek
            </Button>
          )}
          {data.buildStatus === "onreview" && (
            <Button disabled variant="text" startIcon={<DoneAll />}>
              Sudah dikirim
            </Button>
          )}
          {data.buildStatus === "accept" && (
            <Button disabled variant="text" startIcon={<DoneAll />}>
              Sudah dikirim
            </Button>
          )}
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
              dari kami. Jika melebihi, tolong{" "}
              <Link href="/" underline="hover" color="secondary">
                hubungi kami.
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="start" gap={1} sx={{ p: 3 }}>
          <Typography variant="body2">Luncurkan proyekmu!</Typography>
          <Button variant="contained" disabled={data.buildStatus !== "accept"}>
            luncurkan
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default OverviewMain;

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
  useFetcher,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import CircularProgressWithLabel from "../progress/CircularProgressWithLabel";
import { Check, DoneAll, Timer } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useFormSubmitContext } from "../../hooks/useFormSubmitContext";

function OverviewMain({ data }) {
  const { setAlertMsg, setSuccess, setAlertOpen } = useFormSubmitContext();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingLaunch, setLoadingLaunch] = useState(false);
  const [launchDate, setLaunchDate] = useState(() => {
    if (
      !data.projectLaunchDate ||
      new Date(data.projectLaunchDate) <= new Date()
    ) {
      return new Date().toISOString();
    }
    return data.projectLaunchDate;
  });

  const buildLocation = useMemo(() => {
    let basePath = `/${params.profileId}/${params.projectId}/build`;
    return basePath;
  }, [location]);

  useEffect(() => {
    if (fetcher.data) {
      setLoadingReview(false);
      setLoadingLaunch(false);
      if (!fetcher.data?.error) {
        setAlertOpen(true);
        setAlertMsg(fetcher.data?.message);
        setSuccess(true);
      } else {
        setAlertOpen(true);
        setAlertMsg(fetcher.data?.message);
        setSuccess(false);
      }
    }
  }, [fetcher.data]);

  return (
    <Container maxWidth="md" sx={{ color: "text.primary", mt: 4 }}>
      <fetcher.Form
        id="formLaunchProject"
        method="put"
        onSubmitCapture={(e) => setLoadingLaunch(true)}
      >
        <input type="hidden" name="_action" value="launch" />
        <input type="hidden" name="launchDate" value={launchDate} />
      </fetcher.Form>
      <fetcher.Form
        id="formSubmitReview"
        method="put"
        onSubmitCapture={(e) => setLoadingReview(true)}
      >
        <input type="hidden" name="_action" value="review" />
      </fetcher.Form>
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
          {data.projectStatus === "draft" && (
            <Button
              type="submit"
              form="formSubmitReview"
              variant="contained"
              loading={busy && loadingReview}
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
          {data.projectStatus === "onreview" && (
            <Button disabled variant="text" startIcon={<DoneAll />}>
              Sudah dikirim
            </Button>
          )}
          {data.projectStatus !== "draft" &&
            data.projectStatus !== "onreview" && (
              <Button disabled variant="text" startIcon={<DoneAll />}>
                Review diterima
              </Button>
            )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          gap={2}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <Avatar
            sx={{
              bgcolor: data.projectStatus !== "draft" ? "primary.main" : null,
            }}
          >
            {data.projectStatus !== "draft" &&
            data.projectStatus !== "onreview" ? (
              <Check />
            ) : (
              <Timer />
            )}
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
          {(data.projectStatus === "draft" ||
            data.projectStatus === "onreview" ||
            data.projectStatus === "accept") && (
            <>
              <Typography variant="body2">Luncurkan proyekmu!</Typography>
              {data.projectStatus === "accept" && (
                <Typography variant="caption" color="textSecondary">
                  Tanggal peluncuran:{" "}
                  {launchDate
                    ? new Date(launchDate).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: "shortGeneric",
                      })
                    : "X"}
                  . Tanggal ini diambil dari informasi dasar yang kamu kirim.
                  Jika tanggal peluncuran tidak ada atau kurang dari hari ini,
                  kami akan mengatur tanggal peluncuran pada hari ini. Ubah
                  tanggal peluncuran sekarang di halaman dasar selagi masih ada
                  kesempatan.
                </Typography>
              )}
              <Button
                variant="contained"
                type="submit"
                form="formLaunchProject"
                loading={busy && loadingLaunch}
                disabled={data.projectStatus !== "accept"}
              >
                luncurkan
              </Button>
            </>
          )}
          {data.projectStatus === "launching" && (
            <Button color="disabled" disabled startIcon={<DoneAll />}>
              Proyek akan diluncurkan
            </Button>
          )}
          {data.projectStatus === "oncampaign" && (
            <Button color="disabled" disabled startIcon={<DoneAll />}>
              Proyek sedang berjalan
            </Button>
          )}
          {data.projectStatus === "finished" && (
            <Button color="disabled" disabled startIcon={<DoneAll />}>
              Proyek sudah selesai
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
}

export default OverviewMain;

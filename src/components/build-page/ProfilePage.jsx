import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Close, Delete, Info, Link, OpenInNew } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useFormSubmitContext } from "../../hooks/useFormSubmitContext";
import { useFetcher, useOutletContext, useParams } from "react-router";
import { Link as RouterLink } from "react-router";
import validator from "validator";
import { getError, setToken } from "../../utils/utils";
import { putBuildForm } from "../../api/build";

function ProfilePage() {
  const filledData = useOutletContext();

  const { projectId: currentSlug, profileId } = useParams();
  const { submitFnRef, setLoading, setIsDirty, setNewUserSlug } =
    useFormSubmitContext();

  let fetcher = useFetcher();

  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [formErrorData, setFormErrorData] = useState([]);
  const [pathname, setPathname] = useState(
    `/${profileId}/${currentSlug}/build`
  );

  const [initialSlug, setInitialSlug] = useState("");
  const [uniqueUrl, setUniqueUrl] = useState("");

  useEffect(() => {
    if (submitFnRef) {
      submitFnRef.current = handleSubmit;
    }

    const changed = uniqueUrl !== initialSlug;
    setIsDirty(changed);
  }, [uniqueUrl, initialSlug]);

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data?.data?.refreshToken) {
        setToken(fetcher.data?.data?.refreshToken);
      }
      if (!fetcher.data.error) {
        setAlertOpen(true);
        setAlertMsg(fetcher.data.message);
        setSuccess(true);

        const userSlug = fetcher.data?.data?.profile?.slug;
        if (userSlug && userSlug !== profileId) {
          window.history.replaceState(
            null,
            "",
            `/${userSlug}/${currentSlug}/build/basic`
          );
          setPathname(`/${userSlug}/${currentSlug}/build`);
        }

        setInitialSlug(fetcher.data?.data?.profile?.slug);
        setNewUserSlug(fetcher.data?.data?.profile?.slug);
      } else {
        setAlertOpen(true);
        setAlertMsg(fetcher.data.message);
        setSuccess(false);
      }
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [fetcher.state]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("slug", uniqueUrl);

    fetcher.submit(formData, { method: "PUT" });
  };

  return (
    <Container maxWidth="lg">
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setAlertOpen(false);
        }}
      >
        <Alert
          variant="filled"
          severity={!success ? "error" : "success"}
          action={
            success ? (
              <Button
                component={RouterLink}
                to={pathname + "/payment"}
                color="inherit"
                size="small"
              >
                Lanjut
              </Button>
            ) : (
              <IconButton
                color="inherit"
                size="small"
                onClick={() => setAlertOpen(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            )
          }
        >
          {alertMsg || "Sukses."}
        </Alert>
      </Snackbar>
      <Box sx={{ py: 6, color: "text.primary" }}>
        <Stack sx={{ mb: 6 }} gap={1}>
          <Typography variant="h4" fontWeight={500}>
            Kenalkan dirimu
          </Typography>
          <Typography variant="body1">
            Deskripsikan dirimu kepada pendukung.
          </Typography>
        </Stack>
        <Stack gap={6}>
          <Grid
            container
            spacing={3}
            sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Profilmu
              </Typography>
              <Typography>
                Profil ini akan muncul di halaman proyekmu dan harus menyertakan
                nama, foto, dan biografi.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack
                gap={2}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={filledData.data?.profile?.avatarUrl}
                  />
                  <Stack>
                    <Typography fontWeight={500}>
                      {filledData.data?.profile?.name || "Kreator Nama"}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Kreator Proyek
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="body2" color="textSecondary">
                  {filledData.data?.profile?.biography ||
                    "Belum ada biografi. Lengkapi profilmu."}
                </Typography>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<OpenInNew />}
                  sx={{ placeSelf: "end" }}
                  component={RouterLink}
                  to={`/settings/${profileId}`}
                >
                  Edit Profil
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pb: 5 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                URL Unik (opsional)
              </Typography>
              <Typography>
                Buat URL khusus untuk halaman profilmu dengan minimal tiga
                karakter. Kami akan membuat URL ini sebagai awalan untuk URL
                profil dan proyekmu.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Stack
                gap={2}
                sx={{
                  p: 3,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <TextField
                  label="URL Unik"
                  name="uniqueUrl"
                  value={uniqueUrl}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          sx={{ color: "text.secondary" }}
                        >
                          <Link />
                          <Typography variant="subtitle1" sx={{ ml: 1 }}>
                            ruangmodal.com/profile/
                          </Typography>
                        </InputAdornment>
                      ),
                    },
                  }}
                  onChange={(e) => setUniqueUrl(e.target.value)}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}

export const profileBuildAction = async ({ request, params }) => {
  const pathname = window.location.pathname;

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  return putBuildForm(postData, pathname);
};

export default ProfilePage;

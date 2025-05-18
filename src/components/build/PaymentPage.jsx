import {
  Alert,
  Autocomplete,
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
import { putBuildForm } from "../../api/api";
import validator from "validator";
import { getError, setToken } from "../../utils/utils";
import { NumericFormat } from "react-number-format";

function PaymentPage() {
  const filledData = useOutletContext();

  const { projectId: currentSlug, profileId } = useParams();
  const { submitFnRef, setLoading, setIsDirty, setNewUserSlug } =
    useFormSubmitContext();

  let fetcher = useFetcher();

  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [formErrorData, setFormErrorData] = useState([]);
  const [pathname, setPathname] = useState(`/${profileId}/${currentSlug}`);

  const {
    email = "",
    businessType = "",
    bankName = "",
    bankAccountNumber = "",
  } = filledData?.data?.payment || {};

  const [initialForm, setInitialForm] = useState({
    email,
    businessType,
    bankName,
    bankAccountNumber,
  });
  const [form, setForm] = useState({
    email,
    businessType,
    bankName,
    bankAccountNumber,
  });

  useEffect(() => {
    if (submitFnRef) {
      submitFnRef.current = handleSubmit;
    }

    const changed = JSON.stringify(form) !== JSON.stringify(initialForm);
    setIsDirty(changed);
  }, [form, initialForm]);

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      console.log(fetcher.data);
      if (!fetcher.data.error) {
        if (fetcher.data?.data?.refreshToken) {
          setToken(fetcher.data?.data?.refreshToken);
        }
        setAlertOpen(true);
        setAlertMsg(fetcher.data.message);
        setSuccess(true);

        const {
          email = "",
          businessType = "",
          bankName = "",
          bankAccountNumber = "",
        } = fetcher.data?.data?.payment || {};
        setInitialForm({ email, businessType, bankName, bankAccountNumber });
        setForm({ email, businessType, bankName, bankAccountNumber });
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
    console.log("Form submitted!");
    const formData = new FormData();
    formData.append("businessType", form.businessType);
    formData.append("bankName", form.bankName);
    formData.append("bankAccountNumber", form.bankAccountNumber);

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
                to={pathname + "/build-overview"}
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
            Verifikasi detail informasi pembayaran
          </Typography>
          <Typography variant="body1">
            Konfirmasikan siapa yang menggalang dana dan menerimanya jika proyek
            ini mencapai target pendanaannya. Periksa kembali informasi kamu dan
            pastikan itu semua benar. Setelah detail diserahkan, artinya kamu
            menyetujui bahwa detail itu benar dan mengakui bahwa detail tersebut
            tidak dapat diubah lagi.
          </Typography>
        </Stack>
        <Stack gap={6}>
          <Grid
            container
            spacing={3}
            sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Grid
              size={{
                xs: 12,
                sm: 4,
              }}
            >
              <Typography variant="h5" fontWeight={500} mb={1}>
                Kontak email
              </Typography>
              <Typography>
                Email yang kamu gunakan saat mendaftar otomatis menjadi kontak
                emailmu. Edit di pengaturan jika ingin mengubah emailmu.
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
                  label="Email"
                  name="email"
                  value={form.email}
                  disabled
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            sx={{ pb: 5, borderBottom: "1px solid", borderColor: "divider" }}
          >
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Kepemilikan proyek
              </Typography>
              <Typography>
                Pilih “Individu” jika kamu menggalang dana untuk proyek ini atas
                nama kamu sendiri. Pilih “Bisnis” jika kamu menggalang dana
                untuk proyek ini atas nama suatu kelompok usaha milik kamu atau
                yang kamu wakilkan secara sah.
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
                <Autocomplete
                  options={["Individu", "Bisnis"]}
                  disabled={filledData.data?.projectStatus !== "draft"}
                  value={form.businessType}
                  onChange={(e, val) =>
                    setForm((prev) => {
                      return { ...prev, businessType: val };
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tipe kepemilikan" />
                  )}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ pb: 5 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Informasi rekening bank
              </Typography>
              <Typography>
                Jika target pendanaan tercapai, dana akan dikirimkan ke rekening
                bank yang didaftarkan.
                <br />
                <br /> Pastikan nama bank dan rekening sesuai, serta mewakili
                proyek ini. Rekening bank tidak dapat diubah setelah kamu
                menyerahkan proyek untuk direview.
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
                  label="Nama bank"
                  name="bankName"
                  disabled={filledData.data?.projectStatus !== "draft"}
                  value={form.bankName}
                  onChange={(e) =>
                    setForm((prev) => {
                      return { ...prev, bankName: e.target.value };
                    })
                  }
                />
                <NumericFormat
                  customInput={TextField}
                  label="Nomor rekening"
                  type="text"
                  name="bankAccountNumber"
                  disabled={filledData.data?.projectStatus !== "draft"}
                  value={form.bankAccountNumber}
                  valueIsNumericString
                  allowLeadingZeros
                  onValueChange={(values, source) => {
                    setForm((prev) => {
                      return { ...prev, bankAccountNumber: values.value };
                    });
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}

export const paymentBuildAction = async ({ request, params }) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  const pathname = window.location.pathname;
  console.log(pathname);

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  return putBuildForm(postData, pathname);
};

export default PaymentPage;

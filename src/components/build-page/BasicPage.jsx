import {
  Alert,
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
import LocationAutocomplete from "../input/LocationAutocomplete";
import CategoryAutocomplete from "../input/CategoryAutoComplete";
import { Close, Link } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en-gb";
import "dayjs/locale/id";
import { useEffect, useState } from "react";
import { useFormSubmitContext } from "../../hooks/useFormSubmitContext";
import { useFetcher, useOutletContext, useParams } from "react-router";
import { Link as RouterLink } from "react-router";
import validator from "validator";
import { getError, setToken } from "../../utils/utils";
import { putBuildForm } from "../../api/build";

dayjs.extend(utc);
dayjs.extend(timezone);

function BasicPage() {
  const filledData = useOutletContext();

  const { projectId: currentSlug, profileId } = useParams();
  const { submitFnRef, setLoading, setIsDirty, setNewSlug } =
    useFormSubmitContext();

  let fetcher = useFetcher();

  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [formErrorData, setFormErrorData] = useState([]);
  const [pathname, setPathname] = useState(
    `/${profileId}/${currentSlug}/build`
  );

  const [initialForm, setInitialForm] = useState({
    title: filledData.data?.basic?.title || "",
    subtitle: filledData.data?.basic?.subTitle || "",
    category: filledData.data?.basic?.category || "",
    location: filledData.data?.basic?.location || "",
    imageUrl: filledData.data?.basic?.imageUrl || "",
    fundTarget: filledData.data?.basic?.fundTarget || null,
    launchDate: filledData.data?.basic?.launchDate
      ? dayjs(filledData.data?.basic?.launchDate)
      : null,
    duration: filledData.data?.basic?.duration || null,
  });
  const [form, setForm] = useState({
    title: filledData.data?.basic?.title || "",
    subtitle: filledData.data?.basic?.subTitle || "",
    category: filledData.data?.basic?.category || "",
    location: filledData.data?.basic?.location || "",
    imageUrl: filledData.data?.basic?.imageUrl || "",
    fundTarget: filledData.data?.basic?.fundTarget || null,
    launchDate: filledData.data?.basic?.launchDate
      ? dayjs(filledData.data?.basic?.launchDate)
      : null,
    duration: filledData.data?.basic?.duration || null,
  });

  useEffect(() => {
    const changed = JSON.stringify(form) !== JSON.stringify(initialForm);
    setIsDirty(changed);
  }, [form, initialForm]);

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      console.log(fetcher.data);
      if (fetcher.data?.data?.refreshToken) {
        setToken(fetcher.data?.data?.refreshToken);
      }
      if (!fetcher.data.error) {
        setAlertOpen(true);
        setAlertMsg(fetcher.data.message);
        setSuccess(true);
        const slug = fetcher.data?.data?.projectSlug;
        if (slug && slug !== currentSlug) {
          window.history.replaceState(
            null,
            "",
            `/${profileId}/${slug}/build/basic`
          );
          setPathname(`/${profileId}/${slug}/build`);
          setNewSlug(slug);
        }

        setForm({
          title: fetcher.data?.data?.basic?.title || "",
          subtitle: fetcher.data?.data?.basic?.subTitle || "",
          category: fetcher.data?.data?.basic?.category || "",
          location: fetcher.data?.data?.basic?.location || "",
          imageUrl: fetcher.data?.data?.basic?.imageUrl || "",
          fundTarget: fetcher.data?.data?.basic?.fundTarget || null,
          launchDate: fetcher.data?.data?.basic?.launchDate
            ? dayjs(fetcher.data?.data?.basic?.launchDate)
            : null,
          duration: fetcher.data?.data?.basic?.duration || null,
        });
        setInitialForm({
          title: fetcher.data?.data?.basic?.title || "",
          subtitle: fetcher.data?.data?.basic?.subTitle || "",
          category: fetcher.data?.data?.basic?.category || "",
          location: fetcher.data?.data?.basic?.location || "",
          imageUrl: fetcher.data?.data?.basic?.imageUrl || "",
          fundTarget: fetcher.data?.data?.basic?.fundTarget || null,
          launchDate: fetcher.data?.data?.basic?.launchDate
            ? dayjs(fetcher.data?.data?.basic?.launchDate)
            : null,
          duration: fetcher.data?.data?.basic?.duration || null,
        });
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

  useEffect(() => {
    if (submitFnRef) {
      submitFnRef.current = handleSubmit;
    }
  }, [form]);

  const handleSubmit = () => {
    validateForm();
    const isValidated = validateForm() && Boolean(formErrorData.length === 0);

    if (isValidated) {
      console.log("Form submitted!");
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("imageUrl", form.imageUrl);
      formData.append("fundTarget", form.fundTarget ? form.fundTarget : "");
      formData.append(
        "launchDate",
        form.launchDate == null ? "" : form.launchDate.format()
      );
      formData.append("duration", form.duration ? form.duration : "");

      fetcher.submit(formData, { method: "PUT" });
    } else {
      setAlertOpen(true);
      setAlertMsg("Input tidak sesuai.");
      setSuccess(false);
    }
  };

  function validateForm() {
    let error = [];

    let title = form.title;
    let subtitle = form.subtitle;
    let imageUrl = form.imageUrl;
    let fundTarget = form.fundTarget;
    let duration = form.duration;

    if (title.length > 0 && !validator.matches(title, /^[a-zA-Z0-9 .'-]+$/)) {
      error.push({
        body: "title",
        message:
          "Hanya boleh huruf (A-Z, a-z), angka (0-9), spasi, karakter (-, ', .).",
      });
    }

    if (
      subtitle.length > 0 &&
      !validator.matches(subtitle, /^[a-zA-Z0-9 .'-]+$/)
    ) {
      error.push({
        body: "subtitle",
        message:
          "Hanya boleh huruf (A-Z, a-z), angka (0-9), spasi, karakter (-, ', .).",
      });
    }

    if (!validator.isURL(imageUrl)) {
      error.push({
        body: "imageUrl",
        message: "Invalid URL.",
      });
    }
    if ((fundTarget >= 0 && fundTarget < 1000000) || fundTarget > 100000000) {
      error.push({
        body: "fundTarget",
        message: "Minimal Rp1.000.000, maksimal Rp100.000.000",
      });
    }

    if ((duration >= 0 && duration < 1) || duration > 60) {
      error.push({
        body: "duration",
        message: "Minimal 1 hari, maksimal 60 hari",
      });
    }

    if (error.length > 0) {
      setFormErrorData((data) => [...data, ...error]);
      return false;
    }
    setFormErrorData((data) => [...data, ...error]);
    return true;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((form) => {
      return { ...form, [name]: value };
    });

    if (name === "title") {
      if (value.length > 60) {
        let error = [{ body: "title", message: "Maksimal 60 karakter." }];
        setFormErrorData((prev) => {
          const filtered = prev.filter((error) => {
            return (
              error.body !== "title" &&
              error.message !== "Maksimal 60 karakter."
            );
          });
          return [...filtered, ...error];
        });
      } else if (value.length < 60) {
        setFormErrorData((prevData) => {
          return prevData.filter((error) => {
            return error.body !== "title";
          });
        });
      }
    } else if (name === "subtitle") {
      if (value && value.length > 150) {
        let error = [{ body: "subtitle", message: "Maksimal 150 karakter." }];
        setFormErrorData((prev) => {
          const filtered = prev.filter((error) => {
            return (
              error.body !== "subtitle" &&
              error.message !== "Maksimal 150 karakter."
            );
          });
          return [...filtered, ...error];
        });
      } else if (value && value.length < 150) {
        setFormErrorData((prevData) => {
          return prevData.filter((error) => {
            return error.body !== "subtitle";
          });
        });
      }
    } else {
      setFormErrorData((prevData) => {
        return prevData.filter((error) => {
          return error.body !== name;
        });
      });
    }
  }

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
                to={pathname + "/story"}
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
            Mulai dari dasarnya
          </Typography>
          <Typography variant="body1">
            Supaya orang mudah mengetahui tentang proyekmu.
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
                Judul Proyek
              </Typography>
              <Typography>
                Tentukan judul dan subjudul yang singkat dan jelas untuk membuat
                orang memahami proyekmu dengan mudah. Judul dan subjudul akan
                ditampilkan di halaman proyek dan kartu hasil pencarian.
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
                  label="Judul"
                  name="title"
                  disabled={filledData.data?.projectStatus !== "draft"}
                  error={Boolean(getError("title", formErrorData))}
                  value={form.title}
                  onChange={handleChange}
                  helperText={
                    <>
                      {Boolean(getError("title", formErrorData)) && (
                        <Typography variant="caption">
                          {getError("title", formErrorData).message}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ ml: "auto" }}
                      >{`${form.title.length}/60`}</Typography>
                    </>
                  }
                  slotProps={{
                    formHelperText: {
                      sx: { display: "flex" },
                      component: Box,
                    },
                  }}
                />
                <TextField
                  label="Subjudul"
                  name="subtitle"
                  disabled={filledData.data?.projectStatus !== "draft"}
                  error={Boolean(getError("subtitle", formErrorData))}
                  value={form.subtitle}
                  onChange={handleChange}
                  helperText={
                    <>
                      {Boolean(getError("subtitle", formErrorData)) && (
                        <Typography variant="caption">
                          {getError("subtitle", formErrorData).message}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ ml: "auto" }}
                      >{`${form.subtitle.length}/150`}</Typography>
                    </>
                  }
                  slotProps={{
                    formHelperText: {
                      sx: { display: "flex", justifyContent: "space-between" },
                      component: Box,
                    },
                  }}
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
                Kategori Proyek
              </Typography>
              <Typography>
                Pilih kategori yang sesuai dengan proyekmu supaya pendukung
                dapat menemukan proyekmu dengan mudah.
                <br />
                <br /> Kamu dapat mengubah ini kapanpun sebelum dan saat
                kampanyemu berlangsung.
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
                <CategoryAutocomplete
                  value={form.category}
                  disabled={filledData.data?.projectStatus !== "draft"}
                  onChange={(e, value) => {
                    setForm((form) => {
                      return { ...form, category: value };
                    });
                  }}
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
                Lokasi Proyek
              </Typography>
              <Typography>
                Pilih lokasi yang paling sesuai dengan dimana proyek anda berada
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
                <LocationAutocomplete
                  value={form.location}
                  disabled={filledData.data?.projectStatus !== "draft"}
                  onChange={(e, value) => {
                    setForm((form) => {
                      return { ...form, location: value };
                    });
                  }}
                  label="Pilih lokasi"
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
                Gambar Proyek
              </Typography>
              <Typography>
                Tambahkan sebuah gambar yang dengan jelas mewakili proyekmu.
                Pilih satu yang terlihat bagus di ukuran yang berbeda-beda.
                Gambar ini akan ditampilkan di halaman proyekmu. <br />
                <br />
                Gambar akan dipotong dengan aspek rasio 16:9.
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
                  label="Link gambar"
                  name="imageUrl"
                  disabled={filledData.data?.projectStatus !== "draft"}
                  error={Boolean(getError("imageUrl", formErrorData))}
                  helperText={
                    Boolean(getError("imageUrl", formErrorData)) &&
                    getError("imageUrl", formErrorData).message
                  }
                  value={form.imageUrl}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Link />
                        </InputAdornment>
                      ),
                    },
                  }}
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
                Target pendanaan
              </Typography>
              <Typography>
                Tetapkan target pendanaan realistis yang mencakup seluruh
                kebutuhan untuk menyelesaikan proyekmu.
                <br />
                <br /> Jika target tidak tercapai, kamu tidak akan menerima
                uang.
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
                <NumericFormat
                  customInput={TextField}
                  disabled={filledData.data?.projectStatus !== "draft"}
                  label="Jumlah target"
                  name="fundTarget"
                  error={Boolean(getError("fundTarget", formErrorData))}
                  helperText={
                    Boolean(getError("fundTarget", formErrorData)) &&
                    getError("fundTarget", formErrorData).message
                  }
                  value={form.fundTarget}
                  onValueChange={(values, sourceInfo) => {
                    const { floatValue } = values;
                    setForm((form) => {
                      return { ...form, fundTarget: floatValue };
                    });
                    setFormErrorData((prevData) => {
                      return prevData.filter((error) => {
                        return error.body !== "fundTarget";
                      });
                    });
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                    },
                  }}
                  valueIsNumericString
                  thousandSeparator="."
                  decimalSeparator=","
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
                Tanggal peluncuran (opsional)
              </Typography>
              <Typography>
                Kamu dapat mengubah tanggal peluncuran ini hingga pada saat kamu
                siap untuk meluncurkan proyek, yang harus dilakukan secara
                manual.
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="id"
                >
                  <DateTimePicker
                    label="Tanggal peluncuran"
                    disabled={
                      filledData.data?.projectStatus === "launching" ||
                      filledData.data?.projectStatus === "oncampaign"
                    }
                    value={form.launchDate}
                    onChange={(newValue) =>
                      setForm((form) => {
                        return { ...form, launchDate: newValue };
                      })
                    }
                    slotProps={{
                      textField: {
                        helperText: `${
                          form.launchDate == null
                            ? ""
                            : new Date(form.launchDate).toLocaleString(
                                "id-ID",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  timeZoneName: "shortGeneric",
                                }
                              )
                        }`,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Typography variant="h5" fontWeight={500} mb={1}>
                Durasi kampanye
              </Typography>
              <Typography>
                Tetapkan batas akhir kampanye antara 1-60 hari setelah
                diluncurkan. Kamu tidak dapat mengubah durasi saat proyek sedang
                berlangsung.
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
                <NumericFormat
                  customInput={TextField}
                  disabled={filledData.data?.projectStatus !== "draft"}
                  label="Durasi"
                  name="duration"
                  error={Boolean(getError("duration", formErrorData))}
                  helperText={
                    Boolean(getError("duration", formErrorData)) &&
                    getError("duration", formErrorData).message
                  }
                  value={form.duration}
                  onValueChange={(values, sourceInfo) => {
                    const { floatValue } = values;
                    setForm((form) => {
                      return { ...form, duration: floatValue };
                    });
                    setFormErrorData((prevData) => {
                      return prevData.filter((error) => {
                        return error.body !== "duration";
                      });
                    });
                  }}
                  placeholder="Ketik 1-60 (hari)"
                  valueIsNumericString
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}

export const basicBuildAction = async ({ request, params }) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  const pathname = window.location.pathname;
  console.log(pathname);

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  return putBuildForm(postData, pathname);
};

export default BasicPage;

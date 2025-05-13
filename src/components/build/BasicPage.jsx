import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocationAutocomplete from "../input/LocationAutocomplete";
import CategoryAutocomplete from "../input/CategoryAutoComplete";
import { Link } from "@mui/icons-material";
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

dayjs.extend(utc);
dayjs.extend(timezone);

function BasicPage() {
  const submitFnRef = useFormSubmitContext();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    category: "",
    location: "",
    imageUrl: "",
    fundTarget: null,
    launchDate: null,
    duration: null,
  });

  useEffect(() => {
    if (submitFnRef) {
      submitFnRef.current = handleSubmit;
    }
  }, [form]);

  const handleSubmit = () => {
    console.log("Form submitted!");
    console.log(new Date(form.launchDate).toISOString());
    console.log(form.launchDate.format());

    // your actual form submission logic here
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((form) => {
      return { ...form, [name]: value };
    });
  }

  return (
    <Container maxWidth="lg">
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
                  onChange={handleChange}
                  helperText="0/60"
                  slotProps={{ formHelperText: { sx: { textAlign: "end" } } }}
                />
                <TextField
                  label="Subjudul"
                  name="subtitle"
                  onChange={handleChange}
                  helperText="0/150"
                  slotProps={{ formHelperText: { sx: { textAlign: "end" } } }}
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
                  label="Jumlah target"
                  name="fundTarget"
                  value={form.fundTarget}
                  onValueChange={(values, sourceInfo) => {
                    const { floatValue } = values;
                    setForm((form) => {
                      return { ...form, fundTarget: floatValue };
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
                  label="Durasi"
                  name="duration"
                  onValueChange={(values, sourceInfo) => {
                    const { floatValue } = values;
                    setForm((form) => {
                      return { ...form, duration: floatValue };
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

export default BasicPage;

import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useThemeContext from "../../hooks/useThemeContext";
import { UploadFile } from "@mui/icons-material";
import VisuallyHiddenInput from "../input/VisuallyHiddenInput";
import { useState } from "react";

function StartProjectMain() {
  const { currentTheme } = useThemeContext();
  const [file, setFile] = useState(null);

  return (
    <Container maxWidth="sm">
      <Stack sx={{ my: 10 }}>
        <Typography
          variant="h3"
          color="textPrimary"
          fontWeight={500}
          sx={{ placeSelf: "center" }}
        >
          Mulai Proyek
        </Typography>
        <Box
          sx={{
            mt: 3,
            p: 5,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            bgcolor:
              currentTheme === "dark"
                ? "background.paper"
                : "background.default",
          }}
        >
          <Typography variant="body1" fontWeight={700} color="textPrimary">
            Tentukan identitas proyekmu
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Tidak harus diisi sekarang. Kamu tetap bisa mengubahnya nanti.
          </Typography>
          <Stack gap={2} sx={{ mt: 2 }}>
            <TextField variant="outlined" size="medium" label="Nama proyek" />
            <Autocomplete
              id="tags-outlined"
              options={[]}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Pilih kategori" />
              )}
            />
            <Autocomplete
              id="tags-outlined"
              options={[]}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Pilih lokasi" />
              )}
            />
          </Stack>
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 5,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "divider",
            bgcolor:
              currentTheme === "dark"
                ? "background.paper"
                : "background.default",
          }}
        >
          <Stack>
            <Typography variant="body1" fontWeight={700} color="textPrimary">
              Apa nama sekolahmu?
            </Typography>
            <Autocomplete
              id="tags-outlined"
              options={[]}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              form="skibidi"
              renderInput={(params) => (
                <TextField {...params} label="Nama sekolah" />
              )}
              sx={{ mt: 2 }}
            />
            <Typography
              sx={{ mt: 3 }}
              variant="body1"
              fontWeight={700}
              color="textPrimary"
            >
              Mohon sediakan bukti bahwa kamu adalah pelajar SMA aktif di
              sekolahmu.
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Unggah file berupa gambar tentang status kepelajaranmu sekarang
              sebagai bagian dari proses verifikasi untuk memulai proyek.
            </Typography>
            <Box sx={{ mt: 2, position: "relative" }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFile />}
              >
                Unggah
                <VisuallyHiddenInput
                  type="file"
                  onClick={() => {
                    if (file) setFile(null);
                  }}
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setFile(event.target.files[0]);
                  }}
                  accept="image/png, image/jpg, image/jpeg"
                />
              </Button>
              {file && (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ ml: 1 }}
                >
                  {file.name}
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 3 }}>
          <Button variant="contained" color="primary">
            lanjutkan membuat
          </Button>
          <Button variant="outlined" color="error">
            batalkan
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default StartProjectMain;

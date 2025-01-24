import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useThemeContext from "../../hooks/useThemeContext";
import { UploadFile } from "@mui/icons-material";
import VisuallyHiddenInput from "../input/VisuallyHiddenInput";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

const fetchAllData = async () => {
  const endpoint1 =
    "https://api-sekolah-indonesia.vercel.app/sekolah/SMA?provinsi=050000&perPage=1488";
  const endpoint2 =
    "https://api-sekolah-indonesia.vercel.app/sekolah/SMK?provinsi=050000&perPage=1927";

  const [data1, data2] = await Promise.all([
    fetch(endpoint1).then((res) => res.json()),
    fetch(endpoint2).then((res) => res.json()),
  ]);

  return [...data1.dataSekolah, ...data2.dataSekolah]; // Combine the data arrays
};

function StartProjectMain() {
  const { currentTheme } = useThemeContext();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationValue, setLocationValue] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [schools, setSchools] = useState([]);
  const [schoolValue, setSchoolValue] = useState(null);
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [onDebounce, setOnDebounce] = useState(false);

  const handleLocationsOpen = () => {
    setOpen(true);
    (async () => {
      if (locations.length > 0) {
        return;
      }
      setLoading(true);
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/35.json"
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setLocations([...data]);
    })();
  };

  const handleLocationsClose = () => {
    setOpen(false);
    if (locations.length > 0) {
      return;
    }
    setLocations([]);
  };

  // Debounce the fetch function
  const debouncedFilter = debounce((query) => {
    if (!query) {
      setSchools([]);
      return;
    }

    (async () => {
      // console.log(query);

      setLoadingSchool(true);
      const data = await fetchAllData();

      const filtered = data.filter((item) =>
        item.sekolah.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filtered);
      setSchools(filtered);
      setLoadingSchool(false);
      setOnDebounce(false);
    })();
  }, 1000);

  useEffect(() => {
    if (inputValue) {
      debouncedFilter(inputValue);
    } else {
      setSchools([]); // Clear options if input is empty
    }

    // Cleanup debounce on unmount
    return () => {
      debouncedFilter.cancel();
    };
  }, [inputValue]);

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
              id="categoryOptions"
              options={[]}
              getOptionLabel={(option) => option}
              // filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Pilih kategori" />
              )}
            />
            <Autocomplete
              id="locationOptions"
              options={locations}
              open={open}
              value={locationValue}
              loading={loading}
              autoComplete
              onOpen={handleLocationsOpen}
              onClose={handleLocationsClose}
              onChange={(e, value) => {
                setLocationValue(value);
              }}
              getOptionKey={(option) => option.id}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pilih lokasi"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
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
              Apa nama sekolahmu?*
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Ketik sekolahmu dan tunggu sejenak. Jika tidak ada, pilih
              "Tambahkan".
            </Typography>
            <Autocomplete
              freeSolo
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="school-options"
              options={schools.map((school) => {
                return { id: school.id, sekolah: school.sekolah };
              })}
              loading={loadingSchool}
              value={schoolValue}
              onClose={() => {
                setLoadingSchool(false);
                debouncedFilter.cancel();
              }}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setSchoolValue({
                    id: "Others",
                    sekolah: newValue.toUpperCase(),
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setSchoolValue({
                    id: "Others",
                    sekolah: newValue.inputValue.toUpperCase(),
                  });
                } else {
                  setSchoolValue(newValue);
                }
                console.log(newValue);
              }}
              onInputChange={(event, newValue) => {
                if (newValue.toLowerCase() !== inputValue.toLowerCase()) {
                  setOnDebounce(true);
                  setInputValue(newValue);
                }
              }}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }

                return option.sekolah;
              }}
              getOptionKey={(option) => option.id}
              filterSelectedOptions
              filterOptions={(options, params) => {
                const { inputValue } = params;
                if (inputValue !== "" && options.length === 0 && !onDebounce) {
                  options.push({
                    inputValue,
                    sekolah: `Tambahkan "${inputValue.toUpperCase()}"`,
                  });
                }
                return options;
              }}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    {option.sekolah}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nama sekolah"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingSchool ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
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
              sekolahmu.*
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Unggah file berupa gambar tentang status kepelajaranmu sekarang
              sebagai bagian dari proses verifikasi untuk memulai proyek.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              gap={1}
              sx={{ mt: 2, position: "relative" }}
            >
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
                  sx={{ alignSelf: { xs: "start", sm: "center" } }}
                >
                  {file.name}
                </Typography>
              )}
            </Stack>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 3 }}>
              *Harus diisi. Pastikan data sekolah sudah benar karena tidak bisa
              diubah lagi setelah dikirim.
            </Typography>
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

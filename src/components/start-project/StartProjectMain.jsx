import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useThemeContext from "../../hooks/useThemeContext";
import { UploadFile } from "@mui/icons-material";
import VisuallyHiddenInput from "../input/VisuallyHiddenInput";
import { useEffect, useState } from "react";
import LocationAutocomplete from "../input/LocationAutocomplete";
import { businessCategories } from "../../data/staticData";
import SchoolAutocomplete from "../input/SchoolAutocomplete";
import validator from "validator";
import { Link, useFetcher, useNavigate } from "react-router";
import { getError } from "../../utils/utils";
import Cookies from "js-cookie";
import { postStartProject } from "../../api/build";

function StartProjectMain() {
  const { currentTheme } = useThemeContext();
  let fetcher = useFetcher();
  let navigate = useNavigate();
  let busy = fetcher.state !== "idle";
  const [alertOpen, setAlertOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [locationValue, setLocationValue] = useState("");
  const [schoolValue, setSchoolValue] = useState(null);
  const [category, setCategory] = useState("");
  const [projectName, setProjectName] = useState("");

  const [formErrorData, setFormErrorData] = useState([]);

  useEffect(() => {
    if (fetcher.data) {
      console.log(fetcher.data);
      setAlertOpen(true);
      if (!fetcher.data.error) {
        setFile(null);
        setLocationValue("");
        setSchoolValue(null);
        setCategory("");
        setProjectName("");
      }
      if (fetcher.data.refreshToken) {
        Cookies.set("jwt", authData.data.refreshToken, {
          expires: 15 / 1440,
        });
      }
    }
  }, [fetcher.data]);

  const validateForm = (e) => {
    let error = [];
    let project_name = projectName;
    let school = schoolValue?.sekolah || "";
    let fileImg = file;
    console.log(project_name, school);

    // validate name
    project_name = project_name.trim();
    if (!validator.isLength(project_name, { max: 60 })) {
      error.push({
        body: "projectName",
        message: "Maksimal 60 karakter.",
      });
    }

    if (
      project_name != "" &&
      !validator.matches(project_name, /^[a-zA-Z .'-]+$/)
    ) {
      error.push({
        body: "projectName",
        message: "Hanya boleh huruf (A-Z, a-z), spasi, karakter (-, ', .).",
      });
    }

    //validate school
    school = school.trim();
    if (!validator.isLength(school, { min: 5, max: 150 })) {
      error.push({
        body: "school",
        message: "Minimal 5 karakter, maksimal 50.",
      });
    }
    if (!validator.matches(school, /^[a-zA-Z0-9 .'-]+$/)) {
      error.push({
        body: "school",
        message: "Hanya boleh huruf (A-Z, a-z), spasi, karakter (-, ', .).",
      });
    }

    //validate file
    if (!fileImg || fileImg.size > 1048576 * 2) {
      error.push({
        body: "file",
      });
    }

    if (error.length > 0) {
      e.preventDefault();
      setFormErrorData([...error]);
      return false;
    }
    setProjectName(project_name);
    setSchoolValue((prev) => {
      return { ...prev, sekolah: school };
    });

    setFormErrorData([...error]);
    return true;
  };

  const handleSubmit = (e) => {
    let validated = validateForm(e);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("school", schoolValue?.sekolah || "");
    formData.append("projectName", projectName || "");
    formData.append("category", category || "");
    formData.append("location", locationValue || "");
    formData.append("otherSchool", schoolValue?.other || false);

    if (validated) {
      fetcher.submit(formData, {
        method: "post",
        encType: "multipart/form-data",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setAlertOpen(false);
          if (!fetcher.data?.error) {
            navigate(
              `/${fetcher.data.data.userSlug}/${fetcher.data.data.projectSlug}/build-overview`
            );
          }
        }}
        autoHideDuration={1000}
      >
        <Alert
          sx={{
            width: 300,
          }}
          onClose={() => setAlertOpen(false)}
          variant="filled"
          severity={fetcher.data?.error ? "error" : "success"}
        >
          {fetcher.data?.error
            ? "Terjadi kesalahan. Coba lagi nanti."
            : fetcher.data?.message}
        </Alert>
      </Snackbar>
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
            <TextField
              variant="outlined"
              size="medium"
              type="text"
              name="projectName"
              error={Boolean(getError("projectName", formErrorData))}
              helperText={getError("projectName", formErrorData)?.message}
              label="Nama proyek"
              value={projectName}
              onChange={(e) => {
                const value = e.target.value;
                setProjectName(value);
                //reset error on change
                setFormErrorData((prevData) => {
                  return prevData.filter((error) => {
                    return error.body !== "projectName";
                  });
                });
              }}
            />
            <Autocomplete
              id="categoryOptions"
              selectOnFocus
              autoHighlight
              openOnFocus
              value={category}
              options={businessCategories}
              onChange={(e, value) => {
                setCategory(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Pilih kategori" />
              )}
            />
            <LocationAutocomplete
              label="Lokasi"
              autoHighlight
              selectOnFocus
              openOnFocus
              value={locationValue}
              onChange={(e, value) => {
                console.log(value);
                setLocationValue(value);
              }}
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
              Ketik nama sekolahmu dan tunggu sejenak. Jika tidak ada, pilih
              "Tambahkan".
            </Typography>
            <SchoolAutocomplete
              autoHighlight
              error={Boolean(getError("school", formErrorData))}
              helperText={getError("school", formErrorData)?.message}
              onChange={(e, val) => {
                //reset error on change
                setFormErrorData((prevData) => {
                  return prevData.filter((error) => {
                    return error.body !== "school";
                  });
                });
              }}
              value={schoolValue}
              setSchoolValue={setSchoolValue}
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
                color={
                  Boolean(getError("file", formErrorData)) ? "error" : "primary"
                }
                startIcon={<UploadFile />}
              >
                {"Pilih file"}
                <VisuallyHiddenInput
                  type="file"
                  value={file?.filename || ""}
                  onClick={(event) => {
                    event.target.value = "";
                    setFormErrorData((prevData) => {
                      return prevData.filter((error) => {
                        return error.body !== "file";
                      });
                    });
                    setFile(null);
                  }}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    event.target.value = "";

                    console.log(file);
                    if (file) {
                      setFile(file);
                    } else {
                      setFile(null);
                    }
                  }}
                  accept=" image/jpg, image/jpeg"
                />
              </Button>
              <Stack justifyContent="center">
                <Typography
                  variant="caption"
                  color={
                    Boolean(getError("file", formErrorData))
                      ? "error"
                      : "textSecondary"
                  }
                  // sx={{ alignSelf: { xs: "start" } }}
                >
                  {file && file.name}
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    Boolean(getError("file", formErrorData))
                      ? "error"
                      : "textSecondary"
                  }
                  // sx={{ alignSelf: { xs: "start" } }}
                >
                  {"Pilih 1 file berupa gambar (jpg/jpeg), ukuran maks 2MB."}
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="caption" color="textSecondary" sx={{ mt: 3 }}>
              *Harus diisi. Pastikan data sekolah sudah benar karena tidak bisa
              diubah lagi setelah dikirim.
            </Typography>
          </Stack>
        </Box>
        <Stack direction={{ xs: "column", sm: "row" }} gap={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            loading={busy}
            loadingPosition="start"
            type="button"
            color="primary"
            onClick={handleSubmit}
            // onSubmit={handleSubmit}
          >
            lanjutkan membuat
          </Button>
          <Button variant="outlined" color="error" component={Link} to="..">
            batalkan
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export const startProjectMainAction = async ({ request }) => {
  const formData = await request.formData();

  const data = await postStartProject(formData);
  return data;
};
export default StartProjectMain;

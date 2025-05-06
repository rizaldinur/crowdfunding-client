import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useOutletContext,
  Link as RouterLink,
  Form,
  useActionData,
  useFetcher,
  useNavigate,
  useLoaderData,
  Await,
  Navigate,
} from "react-router";
import { AppRegistration } from "@mui/icons-material";
import AuthNav from "../components/navigation/AuthNav";
import { Suspense, useEffect, useState } from "react";
import validator from "validator";
import CustomPasswordTextField from "../components/input/CustomPasswordTextField";
import { getError } from "../utils/utils";
import LoadingPage from "../components/LoadingPage";
import { authenticateJWT, postSignup } from "../api/api";
import Cookies from "js-cookie";

function Signup() {
  useEffect(() => {
    document.title = "Daftar";
  }, []);

  // const data = useActionData();
  const fetcher = useFetcher();
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
  const [formErrorData, setFormErrorData] = useState([]);
  const { authData } = useLoaderData();

  let navigate = useNavigate();

  let busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        console.log(fetcher.data.error);
        setAlertErrorOpen(true);
        setFormErrorData(fetcher.data.data);
        return;
      }
      setAlertSuccessOpen(true);
    }
  }, [fetcher.data]);

  const [currentTheme] = useOutletContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
    setFormErrorData((prevData) => {
      return prevData.filter((error) => {
        return error.body !== name;
      });
    });
  };

  const validateSubmit = (e) => {
    let error = [];
    let { email, name, password, confirmPassword } = form;

    //sanitize and validate email
    email = validator.trim(email);
    if (email.length > 0) {
      email = validator.normalizeEmail(email);
    }
    console.log(email, email.length);

    if (validator.isEmpty(email)) {
      error.push({
        body: "email",
        message: "Harus diisi.",
      });
    }
    if (!validator.isEmail(email)) {
      error.push({
        body: "email",
        message: "Masukkan format email yang benar.",
      });
    }

    //sanitize and validate name
    name = validator.trim(name);
    if (validator.isEmpty(name)) {
      error.push({
        body: "name",
        message: "Harus diisi.",
      });
    }
    if (!validator.isLength(name, { min: 2, max: 100 })) {
      error.push({
        body: "name",
        message: "Minimal 2 huruf, maksimal 100 huruf.",
      });
    }
    if (!validator.matches(name, /^[a-zA-Z .'-]+$/)) {
      error.push({
        body: "name",
        message: "Hanya boleh huruf (A-Z, a-z), spasi, karakter (-, ', .).",
      });
    }

    //validate password
    if (validator.isEmpty(password)) {
      error.push({
        body: "password",
        message: "Harus diisi.",
      });
    }
    if (!validator.isStrongPassword(password) || /\s/.test(password)) {
      error.push({
        body: "password",
        message:
          "Minimal 8 karakter, 1 huruf kecil, 1 huruf kapital, 1 simbol, 1 angka, tanpa spasi.",
      });
    }

    //validate confirm password
    if (!validator.equals(password, confirmPassword)) {
      error.push({
        body: "confirmPassword",
        message: "Password tidak cocok.",
      });
    }

    if (error.length > 0) {
      e.preventDefault();
      setFormErrorData([...error]);
      return;
    }
    setForm((prevForm) => {
      return { ...prevForm, email: email, name: name };
    });

    setFormErrorData([...error]);
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={authData}>
        {(authData) => {
          if (authData.data.authenticated) {
            return <Navigate to=".." replace />;
          }
          return (
            <>
              <AuthNav />
              <Snackbar
                open={alertErrorOpen}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setAlertErrorOpen(false)}
              >
                <Alert
                  sx={{
                    width: 300,
                  }}
                  onClose={() => setAlertErrorOpen(false)}
                  variant="filled"
                  severity="error"
                >
                  {fetcher.data?.message || "Something went wrong."}
                </Alert>
              </Snackbar>
              <Snackbar
                open={alertSuccessOpen}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => {
                  setAlertSuccessOpen(false);
                  navigate("/login");
                }}
                autoHideDuration={1000}
              >
                <Alert
                  sx={{ width: 300 }}
                  onClose={() => setAlertSuccessOpen(false)}
                  variant="filled"
                  severity="success"
                >
                  {fetcher.data?.message || "Sukses."}
                </Alert>
              </Snackbar>
              <Container sx={{ position: "relative" }} maxWidth="sm">
                <Box
                  sx={{
                    mt: 10,
                    padding: 5,
                    placeSelf: "center",
                    width: 450,
                    boxSizing: "border-box",
                    maxWidth: 1,
                    border: "solid 1px",
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor:
                      currentTheme === "light"
                        ? "background.default"
                        : "background.paper",
                  }}
                >
                  <Stack alignItems="center">
                    <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
                      <AppRegistration />
                    </Avatar>
                    <Typography
                      variant="h4"
                      color="textPrimary"
                      marginBottom={3}
                    >
                      Daftar
                    </Typography>
                    <Stack width={1}>
                      <fetcher.Form
                        method="post"
                        noValidate
                        autoComplete="off"
                        onSubmit={validateSubmit}
                      >
                        <TextField
                          type="text"
                          label="Nama"
                          name="name"
                          onChange={handleChange}
                          value={form.name}
                          error={Boolean(getError("name", formErrorData))}
                          helperText={getError("name", formErrorData)?.message}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          type="email"
                          label="Email"
                          name="email"
                          onChange={handleChange}
                          value={form.email}
                          error={Boolean(getError("email", formErrorData))}
                          helperText={getError("email", formErrorData)?.message}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <CustomPasswordTextField
                          type="password"
                          label="Password"
                          name="password"
                          onChange={handleChange}
                          value={form.password}
                          error={Boolean(getError("password", formErrorData))}
                          helperText={
                            getError("password", formErrorData)?.message
                          }
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <CustomPasswordTextField
                          type="password"
                          label="Konfirmasi password"
                          name="confirmPassword"
                          onChange={handleChange}
                          value={form.confirmPassword}
                          error={Boolean(
                            getError("confirmPassword", formErrorData)
                          )}
                          helperText={
                            getError("confirmPassword", formErrorData)?.message
                          }
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <Button
                          variant="contained"
                          disabled={busy}
                          type="submit"
                          sx={{ width: 1, mb: 2 }}
                          startIcon={
                            busy && (
                              <CircularProgress size={30} color="inherit" />
                            )
                          }
                        >
                          {busy ? "memperoses" : "Daftar"}
                        </Button>
                      </fetcher.Form>
                      <Divider
                        component="div"
                        role="presentation"
                        sx={{ mb: 2 }}
                      >
                        <Typography variant="subtitle2" color="divider">
                          Atau
                        </Typography>
                      </Divider>
                      <Typography variant="body2" color="textSecondary">
                        Sudah punya akun?&nbsp;
                        <Link
                          component={RouterLink}
                          to="/login"
                          underline="hover"
                        >
                          Masuk
                        </Link>
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Container>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const signupLoader = () => {
  const authData = authenticateJWT(Cookies.get("jwt") || "");
  return { authData };
};

export const signupAction = async ({ request }) => {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const data = await postSignup(postData);
  return data;
};

export default Signup;

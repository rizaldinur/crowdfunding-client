import { Lock } from "@mui/icons-material";
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
  Await,
  Navigate,
  Link as RouterLink,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router";
import { Form, useOutletContext } from "react-router";
import AuthNav from "../components/navigation/AuthNav";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomPasswordTextField from "../components/input/CustomPasswordTextField";
import { getError } from "../utils/utils";
import LoadingPage from "../components/LoadingPage";
import validator from "validator";
import { postLogin, authenticateJWT } from "../api/api";

function Login() {
  useEffect(() => {
    document.title = "Masuk";
  }, []);

  const [currentTheme] = useOutletContext();
  const navigate = useNavigate();
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
  const [formErrorData, setFormErrorData] = useState([]);
  const { authData } = useLoaderData();

  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        setAlertErrorOpen(true);
        return;
      }
      Cookies.set("jwt", fetcher.data.data.token, { expires: 15 / 1440 });
      setAlertSuccessOpen(true);
    }
  }, [fetcher.data]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;

    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
    //reset error on change
    setFormErrorData((prevData) => {
      return prevData.filter((error) => {
        return error.body !== name;
      });
    });
  };

  const validateSubmit = (e) => {
    let error = [];
    let { email, password } = form;

    email = validator.trim(email);
    if (email.length > 0) {
      email = validator.normalizeEmail(email);
    }
    if (email.length === 0) {
      error.push({
        body: "email",
        message: "Harus diisi.",
      });
    }
    if (!validator.isEmail(email)) {
      error.push({
        body: "email",
        message: "Masukkan email yang benar.",
      });
    }
    if (password.length === 0) {
      error.push({
        body: "password",
        message: "Harus diisi.",
      });
    }
    console.log(error);

    setForm((prevForm) => {
      return { ...prevForm, email: email, password: password };
    });
    if (error.length > 0) {
      e.preventDefault();
      setFormErrorData([...error]);
      return;
    }
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
                  navigate("/", { replace: true });
                }}
                autoHideDuration={1000}
              >
                <Alert sx={{ width: 300 }} variant="filled" severity="success">
                  {fetcher.data?.message || "Sukses."}
                </Alert>
              </Snackbar>
              <Container maxWidth="sm">
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
                      <Lock />
                    </Avatar>
                    <Typography
                      variant="h4"
                      color="textPrimary"
                      marginBottom={3}
                    >
                      Masuk
                    </Typography>
                    <Stack width={1}>
                      <fetcher.Form
                        method="post"
                        onSubmit={validateSubmit}
                        noValidate
                      >
                        <TextField
                          type="email"
                          label="Email"
                          name="email"
                          onChange={handleChange}
                          error={
                            Boolean(getError("email", formErrorData)) ||
                            alertErrorOpen
                          }
                          helperText={getError("email", formErrorData)?.message}
                          value={form.email}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <CustomPasswordTextField
                          label="Password"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          error={
                            Boolean(getError("password", formErrorData)) ||
                            alertErrorOpen
                          }
                          helperText={
                            getError("password", formErrorData)?.message
                          }
                          value={form.password}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <Link href="#" underline="hover" marginBottom={3}>
                          <Typography variant="body2">
                            Lupa Password?
                          </Typography>
                        </Link>
                        <Button
                          variant="contained"
                          loading={busy}
                          loadingPosition="start"
                          type="submit"
                          sx={{ width: 1, mb: 2 }}
                        >
                          {busy ? "mengautentikasi" : "Masuk"}
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
                        Belum punya akun?&nbsp;
                        <Link
                          component={RouterLink}
                          to="/signup"
                          underline="hover"
                        >
                          Daftar
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

export const loginLoader = () => {
  const authData = authenticateJWT(Cookies.get("jwt") || "");
  return { authData };
};

export const loginAction = async ({ request }) => {
  console.log(request);

  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const data = await postLogin(postData);
  return data;
};

export default Login;

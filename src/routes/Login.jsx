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
import { Link as RouterLink, useFetcher, useNavigate } from "react-router";
import { Form, useOutletContext } from "react-router";
import AuthNav from "../components/navigation/AuthNav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CustomPasswordTextField from "../components/input/CustomPasswordTextField";

function Login() {
  const [currentTheme] = useOutletContext();
  const navigate = useNavigate();
  document.title = "Masuk";
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);

  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";
  useEffect(() => {
    if (fetcher.data) {
      console.log(fetcher.data);
      if (fetcher.data.error) {
        return setAlertErrorOpen(true);
      }
      Cookies.set("jwt", fetcher.data.token, { expires: 15 / 1440 });
      return setAlertSuccessOpen(true);
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
  };

  return (
    <>
      <AuthNav />
      <Snackbar
        open={alertErrorOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          setAlertSuccessOpen(false);
          navigate("/");
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
            <Typography variant="h4" color="textPrimary" marginBottom={3}>
              Masuk
            </Typography>
            <Stack width={1}>
              <fetcher.Form method="post" noValidate>
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  error={alertErrorOpen}
                  value={form.email}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomPasswordTextField
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  error={alertErrorOpen}
                  value={form.password}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Link href="#" underline="hover" marginBottom={3}>
                  <Typography variant="body2">Lupa Password?</Typography>
                </Link>
                <Button
                  variant="contained"
                  disabled={busy}
                  type="submit"
                  sx={{ width: 1, mb: 2 }}
                  startIcon={
                    busy && <CircularProgress size={30} color="inherit" />
                  }
                >
                  {busy ? "mengautentikasi" : "Masuk"}
                </Button>
              </fetcher.Form>
              <Divider component="div" role="presentation" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="divider">
                  Atau
                </Typography>
              </Divider>
              <Typography variant="body2" color="textSecondary">
                Belum punya akun?&nbsp;
                <Link component={RouterLink} to="/signup" underline="hover">
                  Daftar
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);

  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export default Login;

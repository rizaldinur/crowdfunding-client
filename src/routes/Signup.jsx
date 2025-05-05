import {
  Alert,
  Avatar,
  Box,
  Button,
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
  isRouteErrorResponse,
} from "react-router";
import { AppRegistration } from "@mui/icons-material";
import AuthNav from "../components/navigation/AuthNav";
import { useEffect, useState } from "react";
import validator from "validator";
import CustomPasswordTextField from "../components/input/CustomPasswordTextField";

function Signup() {
  const data = useActionData();
  const [alertErrorOpen, setAlertErrorOpen] = useState(false);
  const [alertSuccessOpen, setAlertSuccessOpen] = useState(false);
  useEffect(() => {
    if (data) {
      if (data.error) {
        return setAlertErrorOpen(true);
      }
      return setAlertSuccessOpen(true);
    }
  }, [data]);

  const [currentTheme] = useOutletContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: { status: false, message: "" },
    email: { status: false, message: "" },
    password: { status: false, message: "" },
    confirmPassword: { status: false, message: "" },
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevForm) => {
      return { ...prevForm, [name]: value };
    });
  };

  const validateSubmit = (e) => {
    setAlertErrorOpen(false);
    setAlertSuccessOpen(false);
    //validate email
    let email = validator.trim(form.email);
    while (true) {
      if (validator.isEmpty(email)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            email: { status: true, message: "Harus diisi." },
          };
        });
        break;
      }
      if (!validator.isEmail(email)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            email: {
              status: true,
              message: "Masukkan format email yang benar.",
            },
          };
        });
        break;
      }
      setError((prevError) => {
        return {
          ...prevError,
          email: { status: false, message: "" },
        };
      });
      email = validator.normalizeEmail(email);
      setForm((prevForm) => {
        return { ...prevForm, email: email };
      });
      break;
    }

    //validate name
    const name = validator.trim(form.name);
    while (true) {
      if (validator.isEmpty(name)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            name: { status: true, message: "Harus diisi." },
          };
        });
        break;
      }
      if (!validator.isLength(name, { min: 2, max: 100 })) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            name: {
              status: true,
              message: "Minimal 2 huruf, maksimal 100 huruf.",
            },
          };
        });
        break;
      }
      if (!validator.matches(name, /^[a-zA-Z .'-]+$/)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            name: {
              status: true,
              message:
                "Hanya boleh huruf (A-Z, a-z), spasi, karakter (-, ', .).",
            },
          };
        });
        break;
      }
      setError((prevError) => {
        return {
          ...prevError,
          name: { status: false, message: "" },
        };
      });
      setForm((prevForm) => {
        return { ...prevForm, name: name };
      });
      break;
    }

    //validate password
    const password = form.password;
    while (true) {
      if (validator.isEmpty(password)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            password: { status: true, message: "Harus diisi." },
          };
        });
        break;
      }
      if (!validator.isStrongPassword(password) || /\s/.test(password)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            password: {
              status: true,
              message:
                "Minimal 8 karakter, 1 huruf kecil, 1 huruf kapital, 1 simbol, 1 angka, tanpa spasi.",
            },
          };
        });
        break;
      }
      setError((prevError) => {
        return {
          ...prevError,
          password: { status: false, message: "" },
        };
      });
      setForm((prevForm) => {
        return { ...prevForm, password: password };
      });
      break;
    }

    //validate confirm password
    const confirmPassword = form.confirmPassword;
    while (true) {
      if (!validator.equals(password, confirmPassword)) {
        e.preventDefault();
        setError((prevError) => {
          return {
            ...prevError,
            confirmPassword: { status: true, message: "Password tidak cocok." },
          };
        });
        break;
      }
      setError((prevError) => {
        return {
          ...prevError,
          confirmPassword: { status: false, message: "" },
        };
      });
      setForm((prevForm) => {
        return { ...prevForm, confirmPassword: confirmPassword };
      });
      break;
    }
  };

  document.title = "Daftar";
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
          {data?.message || "Something went wrong."}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertSuccessOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlertSuccessOpen(false)}
      >
        <Alert
          sx={{ width: 300 }}
          onClose={() => setAlertSuccessOpen(false)}
          variant="filled"
          severity="success"
        >
          {data ? data.message : "Sukses."}
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
            <Typography variant="h4" color="textPrimary" marginBottom={3}>
              Daftar
            </Typography>
            <Stack width={1}>
              <Form method="post" noValidate onSubmit={validateSubmit}>
                <TextField
                  type="text"
                  label="Nama"
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  error={error.name.status}
                  helperText={error.name.status && error.name.message}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  type="email"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  error={error.email.status}
                  helperText={error.email.status && error.email.message}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomPasswordTextField
                  type="password"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  error={error.password.status}
                  helperText={error.password.status && error.password.message}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomPasswordTextField
                  type="password"
                  label="Konfirmasi password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
                  error={error.confirmPassword.status}
                  helperText={
                    error.confirmPassword.status &&
                    error.confirmPassword.message
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 1, mb: 2 }}
                >
                  Daftar
                </Button>
              </Form>
              <Divider component="div" role="presentation" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="divider">
                  Atau
                </Typography>
              </Divider>
              <Typography variant="body2" color="textSecondary">
                Sudah punya akun?&nbsp;
                <Link component={RouterLink} to="/login" underline="hover">
                  Masuk
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

  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export default Signup;

import { Lock } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { Form, useOutletContext } from "react-router";
import AuthNav from "../components/navigation/AuthNav";
import { useEffect } from "react";
import Cookies from "js-cookie";

function Login() {
  const [currentTheme] = useOutletContext();
  const navigate = useNavigate();
  document.title = "Masuk";

  return (
    <>
      <AuthNav />
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
              <TextField
                type="email"
                label="Email"
                name="email"
                sx={{ mb: 2 }}
              />
              <TextField
                type="password"
                label="Password"
                name="password"
                sx={{ mb: 2 }}
              />
              <Link href="#" underline="hover" marginBottom={3}>
                <Typography variant="body2">Lupa Password?</Typography>
              </Link>
              <Button
                variant="contained"
                sx={{ width: 1, mb: 2 }}
                onClick={() => {
                  Cookies.set("token", "Base 64 token here", {
                    expires: 1 / 96,
                  });
                  window.location.assign("/");
                }}
              >
                Masuk
              </Button>
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

export default Login;

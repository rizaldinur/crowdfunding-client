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
import { useOutletContext, Link as RouterLink } from "react-router";
import { AppRegistration } from "@mui/icons-material";
import AuthNav from "../components/navigation/AuthNav";

function Signup() {
  const [currentTheme] = useOutletContext();
  document.title = "Daftar";
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
              <AppRegistration />
            </Avatar>
            <Typography variant="h4" color="textPrimary" marginBottom={3}>
              Daftar
            </Typography>
            <Stack width={1}>
              <TextField type="text" label="Nama" name="nama" sx={{ mb: 2 }} />
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
              <TextField
                type="password"
                label="Konfirmasi password"
                name="confirmPassword"
                sx={{ mb: 2 }}
              />

              <Button variant="contained" sx={{ width: 1, mb: 2 }}>
                Daftar
              </Button>
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

export default Signup;

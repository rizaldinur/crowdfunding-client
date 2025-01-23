import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid2,
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
              Signup
            </Typography>
            <Stack width={1}>
              <Grid2 container spacing={2} sx={{ mb: 2 }}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField
                    type="text"
                    label="First Name"
                    name="firstName"
                    sx={{ width: 1 }}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                  <TextField
                    type="text"
                    label="Last Name"
                    name="lastName"
                    sx={{ width: 1 }}
                  />
                </Grid2>
              </Grid2>
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
                label="Confirm Password"
                name="confirmPassword"
                sx={{ mb: 2 }}
              />

              <Button variant="contained" sx={{ width: 1, mb: 2 }}>
                Login
              </Button>
              <Divider component="div" role="presentation" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="divider">
                  Or
                </Typography>
              </Divider>
              <Typography variant="body2" color="textSecondary">
                Already have account?&nbsp;
                <Link component={RouterLink} to="/login" underline="hover">
                  Login
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

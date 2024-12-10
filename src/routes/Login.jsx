import { Lock } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid2,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import { Form, useOutletContext } from "react-router";
import AuthNav from "../components/AuthNav";

function Login() {
  const [currentTheme] = useOutletContext();
  return (
    <>
      <AuthNav />
      <Grid2 container justifyContent="center">
        <Grid2
          padding={5}
          size={{ xs: 10, sm: 7, md: 5, lg: 4, xl: 2.5, xxl: 2 }}
          bgcolor={currentTheme === "light" ? "background" : "background.paper"}
          sx={{ border: "solid 1px", borderColor: "divider" }}
          borderRadius={2}
        >
          <Stack alignItems="center">
            <Avatar sx={{ bgcolor: "secondary.main", mb: 1 }}>
              <Lock />
            </Avatar>
            <Typography variant="h4" color="textPrimary" marginBottom={3}>
              Login
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
                <Typography variant="body2">Forgot Password?</Typography>
              </Link>
              <Button variant="contained" sx={{ width: 1, mb: 2 }}>
                Login
              </Button>
              <Divider component="div" role="presentation" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="divider">
                  Or
                </Typography>
              </Divider>
              <Typography variant="body2" color="textSecondary">
                Don't have account?&nbsp;
                <Link component={RouterLink} to="/signup" underline="hover">
                  Signup
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}

export default Login;

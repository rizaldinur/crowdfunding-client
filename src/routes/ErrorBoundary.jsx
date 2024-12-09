import {
  Box,
  Button,
  Container,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import themes from "../themes";
import ThemeContainer from "../components/ThemeContainer";

function ErrorBoundary() {
  const error = useRouteError();

  let errorContent;
  if (isRouteErrorResponse(error)) {
    errorContent = (
      <>
        <Typography variant="h4" color="textSecondary">
          {error.status}
        </Typography>
        <Typography variant="h2" color="textPrimary" marginBottom={4}>
          Try again later
        </Typography>
        <Button component={Link} to="/first" type="button" variant="contained">
          HOME
        </Button>
      </>
    );
  } else if (error instanceof Error) {
    let errorMessage =
      error.status === 404
        ? "Oops, page not found"
        : error.status === 401
        ? "Please login first"
        : error.status === 403
        ? "You are not authorized"
        : "Something went wrong";
    errorContent = (
      <>
        <Typography variant="h3" color="textSecondary">
          {error.status}
        </Typography>
        <Typography variant="h2" color="textPrimary" marginBottom={4}>
          {errorMessage}
        </Typography>
        <Button component={Link} to="/" type="button" variant="contained">
          HOME
        </Button>
      </>
    );
  } else {
    errorContent = (
      <>
        <Typography variant="h3" color="textSecondary">
          500
        </Typography>
        <Typography variant="h2" color="textPrimary" marginBottom={4}>
          Something went wrong
        </Typography>
        <Button component={Link} to="/" type="button" variant="contained">
          HOME
        </Button>
      </>
    );
  }

  const activeTheme = localStorage.getItem("theme") || "light";
  return (
    <ThemeContainer activeTheme={themes[activeTheme]}>
      <Box display="flex" justifyContent="center">
        <Box
          sx={{ bgcolor: "background.paper" }}
          maxWidth={400}
          marginTop={2}
          borderRadius={3}
          padding={10}
          textAlign="center"
        >
          {errorContent}
        </Box>
      </Box>
    </ThemeContainer>
  );
}
export default ErrorBoundary;

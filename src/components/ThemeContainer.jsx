import { Container, ThemeProvider } from "@mui/material";

function ThemeContainer({ activeTheme, children }) {
  return (
    <ThemeProvider theme={activeTheme}>
      <Container
        disableGutters
        maxWidth="false"
        sx={{ minHeight: "100vh", bgcolor: "background.default" }}
      >
        {children}
      </Container>
    </ThemeProvider>
  );
}
export default ThemeContainer;

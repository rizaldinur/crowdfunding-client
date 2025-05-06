import { Container, ThemeProvider } from "@mui/material";

function ThemeContainer({ activeTheme, children, sx, ...props }) {
  return (
    <ThemeProvider theme={activeTheme}>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          ...sx,
        }}
        {...props}
      >
        {children}
      </Container>
    </ThemeProvider>
  );
}
export default ThemeContainer;

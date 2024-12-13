import { Container, Typography } from "@mui/material";

function Test() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" sx={{ mx: "auto", width: "fit-content" }}>
        Test page
      </Typography>
    </Container>
  );
}

export default Test;

import { Container, Stack, Typography } from "@mui/material";

function Index() {
  return (
    <Container maxWidth="lg">
      <Stack alignItems={{ sm: "center" }}>
        {/** align center until hit breakpoint sm(600px) */}
        <Typography variant="h2">You are in INDEX PAGE</Typography>
        <Typography variant="h3">Hello world</Typography>
      </Stack>
    </Container>
  );
}

export default Index;

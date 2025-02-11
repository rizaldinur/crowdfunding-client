import { OpenInNew } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";

function AboutPanel() {
  return (
    <Container maxWidth="md">
      <Stack direction="row" gap={8} sx={{ py: 4 }}>
        <Typography variant="h6" color="textSecondary">
          Biografi
        </Typography>
        <Stack alignItems="start" gap={2}>
          <Typography>Kamu belum menambahkan biografi.</Typography>
          <Button variant="outlined" color="inherit" startIcon={<OpenInNew />}>
            Edit biografi
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default AboutPanel;

import { Avatar, Box, Container, Stack, Typography } from "@mui/material";

function SettingsHead() {
  return (
    <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Stack sx={{ py: 5 }} gap={1}>
          <Typography variant="h3" color="textPrimary">
            Pengaturan akun
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Ubah informasi tentang akunmu.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
export default SettingsHead;

import { Avatar, Container, Stack, Typography } from "@mui/material";

function ProfileHead() {
  return (
    <Container maxWidth="md">
      <Stack sx={{ py: 5, placeSelf: "center", alignItems: "center" }} gap={2}>
        <Avatar sx={{ width: 200, height: 200 }} />
        <Typography variant="h3" fontWeight={700}>
          Username
        </Typography>
        <Typography variant="subtitle1">
          X proyek didukung • Bergabung (Date here)
        </Typography>
      </Stack>
    </Container>
  );
}
export default ProfileHead;

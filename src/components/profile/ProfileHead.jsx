import { Avatar, Container, Stack, Typography } from "@mui/material";

function ProfileHead({ avatar, userName, totalSupportedProjects, joinDate }) {
  return (
    <Container maxWidth="md">
      <Stack sx={{ py: 5, placeSelf: "center", alignItems: "center" }} gap={2}>
        <Avatar sx={{ width: 200, height: 200 }} src={avatar} />
        <Typography variant="h3" fontWeight={700} color="textPrimary">
          {userName || "Username"}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {totalSupportedProjects} proyek didukung • Bergabung{" "}
          {joinDate || "(Date here)"}
        </Typography>
      </Stack>
    </Container>
  );
}
export default ProfileHead;

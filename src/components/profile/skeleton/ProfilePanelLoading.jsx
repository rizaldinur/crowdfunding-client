import { CircularProgress, Container, Stack } from "@mui/material";

function ProfilePanelLoading() {
  return (
    <Container maxWidth="md">
      <Stack
        direction="row"
        gap={8}
        sx={{
          py: 4,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Stack>
    </Container>
  );
}

export default ProfilePanelLoading;

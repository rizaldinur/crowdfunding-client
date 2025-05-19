import { Container, Stack } from "@mui/material";
import MinimalCard from "../card/MinimalCard";

function BackedProjectsPanel() {
  return (
    <Container maxWidth="md">
      <Stack sx={{ py: 4 }} gap={4}>
        <MinimalCard variant="backed" />
      </Stack>
    </Container>
  );
}

export default BackedProjectsPanel;

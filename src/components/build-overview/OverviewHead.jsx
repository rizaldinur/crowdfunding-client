import { Delete, RemoveRedEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function OverviewHead({ projectName, creatorName }) {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          color: "text.primary",
          pt: 6,
        }}
      >
        <Typography variant="h3">
          {projectName || "Proyek tanpa nama"}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
          oleh {creatorName || "Kreator"}
        </Typography>
        <Stack direction="row" gap={2} sx={{ mt: 4 }}>
          <Button startIcon={<RemoveRedEye />} color="inherit">
            pratinjau
          </Button>
          <Button startIcon={<Delete />} color="error">
            hapus proyek
          </Button>
        </Stack>
        <Divider />
      </Box>
    </Container>
  );
}

export default OverviewHead;

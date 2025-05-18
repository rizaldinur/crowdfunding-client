import { ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

function UpdatePanel() {
  return (
    <Container maxWidth="md">
      <Stack
        color="text.primary"
        sx={{
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          p: 4,
          my: 5,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          UPDATE #1
        </Typography>
        <Typography variant="h4" fontWeight={600} sx={{ mt: 2 }}>
          Title of update of project's progress
        </Typography>
        <Stack gap={2} direction="row" sx={{ mt: 2 }}>
          <Avatar sx={{ width: 60, height: 60 }} />
          <Stack justifyContent="center">
            <Typography variant="body1">Creator Name</Typography>
            <Typography variant="body1" color="textSecondary">
              Date of creation
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        <Box
          sx={{
            mt: 5,
            display: "-webkit-box", // Enables the use of line-clamp
            WebkitBoxOrient: "vertical", // Required for multi-line truncation
            overflow: "hidden", // Prevents overflow
            WebkitLineClamp: 3, // Limits the text to 3 lines
          }}
        >
          <Typography>
            Content of the news update here. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Esse, pariatur deserunt vel modi nihil
            earum voluptatem ipsum! Error neque explicabo aspernatur
            reprehenderit numquam officia eaque ex illo, deserunt id adipisci.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
            odit. Maxime nobis ut facilis? Aspernatur earum harum nam, error
            perspiciatis corrupti doloremque porro assumenda numquam obcaecati
            soluta, dolorum, a esse?
          </Typography>
        </Box>
        <Button
          sx={{ alignSelf: "start", mt: 5 }}
          component={RouterLink}
          to="update-1"
          state={{ tabValue: 1 }}
          size="large"
          variant="outlined"
          color="inherit"
          endIcon={<ChevronRight />}
        >
          Tampilkan lebih
        </Button>
      </Stack>
    </Container>
  );
}

export default UpdatePanel;

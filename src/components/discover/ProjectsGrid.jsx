import { Box, Container, Grid, Grid2, Pagination, Stack } from "@mui/material";
import MediaCard from "../card/MediaCard";

function ProjectsGrid() {
  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderBottomColor: "divider",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="xl">
        <Grid2 container spacing={4} sx={{ my: 5 }}>
          {Array(6)
            .fill(0)
            .map((val, i) => val + i + 1)
            .map((item) => (
              <Grid2
                size={{ xs: 12, sm: 6, md: 6, lg: 4 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <MediaCard />
              </Grid2>
            ))}
        </Grid2>
      </Container>
      <Container maxWidth="xl" sx={{ mt: "auto" }}>
        <Stack sx={{ mb: 5 }}>
          <Pagination
            count={10}
            color="secondary"
            sx={{ placeSelf: "center" }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default ProjectsGrid;

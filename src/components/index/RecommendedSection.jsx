import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import MediaCard from "../card/MediaCard";

function RecommendedSection() {
  return (
    <Box
      id="featured"
      component="section"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ paddingTop: 5, paddingBottom: 5 }}>
          <Typography
            sx={{ position: "relative", mb: 3 }}
            variant="h6"
            color="textSecondary"
          >
            REKOMENDASI
          </Typography>
          <MediaCard />
        </Box>
      </Container>
    </Box>
  );
}

export default RecommendedSection;

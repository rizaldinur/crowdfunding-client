import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import MediaCard from "../card/MediaCard";

function RecommendedSection({ data = [] }) {
  return (
    <Box
      id="recommended"
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
          {data.length > 0 ? (
            data.map((project, index) => {
              return <MediaCard key={index} data={project} />;
            })
          ) : (
            <Typography color="textSecondary" sx={{ placeSelf: "center" }}>
              Tidak ada data.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default RecommendedSection;

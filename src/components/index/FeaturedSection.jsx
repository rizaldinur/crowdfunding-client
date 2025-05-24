import { Box, Container, Typography } from "@mui/material";
import FeatureCard from "../card/FeatureCard";

function FeaturedSection({ data = {} }) {
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
            UNGGULAN
          </Typography>
          {data ? (
            <FeatureCard data={data} />
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

export default FeaturedSection;

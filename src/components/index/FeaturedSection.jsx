import { Box, Container, Typography } from "@mui/material";
import FeatureCard from "./FeatureCard";

function FeaturedSection() {
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
            FEATURED
          </Typography>
          <FeatureCard />
        </Box>
      </Container>
    </Box>
  );
}

export default FeaturedSection;

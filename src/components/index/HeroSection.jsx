import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

function HeroSection() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{ borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 7,
            paddingBottom: 7,
            position: "relative",
          }}
        >
          <Box
            id="heroContent"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "auto", lg: 700 },
              textAlign: { xs: "center", lg: "initial" },
              placeItems: { xs: "center", lg: "initial" },
            }}
          >
            <Box id="heroBody" sx={{ mb: 3 }}>
              <Typography variant="h2" fontWeight={700} color="textPrimary">
                Bantu Wujudkan Impian Wirausahawan Muda
              </Typography>
              <Typography variant="h5" color="textPrimary">
                Dari pelajar, oleh pelajar, untuk masyarakat. Dukung mereka hari
                ini!
              </Typography>
            </Box>
            <Box
              id="heroActions"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                color: "text.primary",
                width: { xs: 1, sm: "initial" },
              }}
            >
              <Button variant="contained" color="primary" size="large">
                dukung sekarang
              </Button>
              <Button
                component={RouterLink}
                to="#"
                size="large"
                color="inherit"
              >
                mulai proyek
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              flex: "1 1",
              maxWidth: 700,
              display: { xs: "none", lg: "block" },
            }}
          >
            <img
              width="100%"
              src="/public/images/hero-image.png"
              alt="Main hero illustration about crowdfunding"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;

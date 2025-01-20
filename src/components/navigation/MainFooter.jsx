import { Facebook, Instagram, Twitter, X, YouTube } from "@mui/icons-material";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

function MainFooter({ full = false }) {
  return (
    <Box sx={{ py: 8 }}>
      {full && (
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              mb: 8,
              justifyContent: "space-between",
            }}
          >
            <Stack gap={1}>
              <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
                TENTANG
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Tentang kami
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Statistik
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Karir
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
                DUKUNGAN
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Pusat bantuan
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Aturan kami
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Resources
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
                LAINNYA
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Berita
              </Typography>
              <Typography variant="body1" color="textPrimary">
                Riset
              </Typography>
            </Stack>
          </Box>
        </Container>
      )}
      <Container maxWidth={full ? "xl" : "lg"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography variant="body1" color="textPrimary">
            Ruang Modal Program Double Track © 2024
          </Typography>
          <Stack direction="row" gap={3}>
            <Link color="textPrimary" underline="none" href="#">
              <Facebook />
            </Link>
            <Link color="textPrimary" underline="none" href="#">
              <Instagram />
            </Link>
            <Link color="textPrimary" underline="none" href="#">
              <X />
            </Link>
            <Link color="textPrimary" underline="none" href="#">
              <YouTube />
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default MainFooter;

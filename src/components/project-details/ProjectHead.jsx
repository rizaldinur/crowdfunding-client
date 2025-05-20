import {
  Bookmark,
  Category,
  Facebook,
  Instagram,
  LocationOn,
  Mail,
  Save,
  Share,
  X,
  YouTube,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { numericFormatter } from "react-number-format";

function ProjectHead({ data = {} }) {
  return (
    <Box>
      <Container maxWidth="xl">
        <Box sx={{ py: 5 }}>
          <Typography
            sx={{ placeSelf: "center" }}
            variant="h3"
            color="textPrimary"
            fontWeight="700"
          >
            {data.title || "Judul Proyek"}
          </Typography>
          <Typography
            sx={{ placeSelf: "center" }}
            variant="subtitle1"
            color="textSecondary"
          >
            {data.subtitle ||
              "Subjudul konten yang menjelaskan proyek secara singkat, padat, dan jelas."}
          </Typography>
          <Grid container spacing={5} sx={{ mt: 5 }}>
            <Grid size={{ xs: 12, md: 6.5 }}>
              <Box sx={{ aspectRatio: "16/9" }}>
                <img
                  src={
                    data.imageUrl ||
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  alt="project main image"
                  width={640}
                  height={360}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
              <Stack direction="row" gap={2} sx={{ mt: 1 }}>
                <Link
                  color="textPrimary"
                  underline="none"
                  variant="body2"
                  href="#"
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <Category />
                  {data.category || "Kategori"}
                </Link>
                <Link
                  color="textPrimary"
                  underline="none"
                  variant="body2"
                  href="#"
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <LocationOn />
                  {data.location || "Surabaya"}
                </Link>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box>
                <LinearProgress
                  value={70}
                  variant="determinate"
                  color="primary"
                />
                <Typography variant="h4" color="primary" sx={{ mt: 3 }}>
                  Rp {data.funding >= 0 ? data.funding : "X,xxx,xxx"}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  dana terkumpul dari target Rp{" "}
                  {data.fundTarget
                    ? numericFormatter(data.fundTarget?.toString(), {
                        thousandSeparator: ".",
                      })
                    : "X,xxx,xxx"}
                </Typography>
                <Typography variant="h4" color="textPrimary" sx={{ mt: 3 }}>
                  100
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  pendukung
                </Typography>
                <Typography variant="h4" color="textPrimary" sx={{ mt: 3 }}>
                  {data.daysLeft || "5"}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  hari
                </Typography>
                <Stack sx={{ mt: 3 }} spacing={2}>
                  <Button variant="contained" color="primary">
                    dukung proyek
                  </Button>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    color="text.primary"
                  >
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<Bookmark />}
                    >
                      simpan
                    </Button>

                    <Stack direction="row" gap={2}>
                      <Link color="textPrimary" underline="none" href="#">
                        <Instagram />
                      </Link>
                      <Link color="textPrimary" underline="none" href="#">
                        <X />
                      </Link>
                      <Link color="textPrimary" underline="none" href="#">
                        <Mail />
                      </Link>
                      <Link color="textPrimary" underline="none" href="#">
                        <Share />
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default ProjectHead;

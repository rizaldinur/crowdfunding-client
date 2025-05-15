import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router";
import { useFormSubmitContext } from "../../hooks/useFormSubmitContext";

function BuildPageNav() {
  const { newSlug, newUserSlug } = useFormSubmitContext();
  const params = useParams();
  const backUrl = `/${newUserSlug ? newUserSlug : params.profileId}/${
    newSlug ? newSlug : params.projectId
  }/build-overview`;

  return (
    <Box
      sx={{
        borderBottom: "solid 1px",
        borderBottomColor: "divider",
        color: "text.primary",
      }}
    >
      <Container maxWidth="xl">
        <Box
          padding="10px 10px"
          display="flex"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Link underline="none" component={RouterLink} to="/">
            <Typography variant="h5" fontWeight={700} display="inline">
              RUANG MODAL
            </Typography>
          </Link>
          <Button
            component={RouterLink}
            to={backUrl}
            startIcon={<ArrowBack />}
            color="inherit"
          >
            Kembali
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default BuildPageNav;

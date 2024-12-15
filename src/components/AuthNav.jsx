import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

function AuthNav() {
  return (
    <Box
      textAlign="center"
      padding="10px 0"
      sx={{ borderBottom: "solid 1px", borderBottomColor: "divider" }}
      marginBottom={10}
    >
      <Link component={RouterLink} to="/" underline="none">
        <Typography variant="h5" fontWeight={700} display="inline">
          RUANG MODAL
        </Typography>
      </Link>
    </Box>
  );
}

export default AuthNav;

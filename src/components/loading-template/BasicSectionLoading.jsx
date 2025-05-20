import { CircularProgress, Container, Stack } from "@mui/material";
import PropTypes from "prop-types";

BasicSectionLoading.PropTypes = {
  sx: PropTypes.object,
};

function BasicSectionLoading({ sx }) {
  return (
    <Container maxWidth="md">
      <Stack
        direction="row"
        gap={8}
        sx={{
          py: 4,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        }}
      >
        <CircularProgress />
      </Stack>
    </Container>
  );
}

export default BasicSectionLoading;

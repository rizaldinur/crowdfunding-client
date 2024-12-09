import { useState } from "react";
import { Box, Button, Grid2 } from "@mui/material";
import { Link } from "react-router";

function App() {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <Box
            component="div"
            sx={{
              bgcolor: "background.paper",
              height: 200,
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Button
              component={Link}
              to="../second"
              color="primary"
              variant="contained"
            >
              GO TO PAGE 2
            </Button>
            <Button color="primary" variant="text">
              TEXT
            </Button>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <Box
            component="div"
            sx={{ bgcolor: "background.paper", height: 200 }}
          >
            <Button color="primary" variant="contained">
              TEXT
            </Button>
            <Button color="error" variant="contained">
              TEXT
            </Button>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Box
            component="div"
            sx={{ bgcolor: "background.paper", height: 200 }}
          >
            <Button color="primary" variant="contained">
              TEXT
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export default App;

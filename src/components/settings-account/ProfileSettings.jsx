import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocationAutocomplete from "../input/LocationAutocomplete";
import { useEffect, useState } from "react";
import { Link } from "@mui/icons-material";

function ProfileSettings() {
  const [locationValue, setLocationValue] = useState("");

  useEffect(() => {
    console.log(locationValue);
  });
  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Stack gap={3} sx={{ width: { xs: 1, md: 500 } }}>
          <TextField label="Nama tampilan" />
          <TextField
            label="Biografi"
            multiline
            rows={3}
            slotProps={{
              formHelperText: {
                sx: { textAlign: "end" },
              },
            }}
            helperText="0/300"
          />
          <LocationAutocomplete
            label="Lokasi"
            handleLocationChange={(value) =>
              setLocationValue(value ? value : "")
            }
          />
          <TextField
            label="URL unik"
            slotProps={{
              formHelperText: {
                sx: { textAlign: "end" },
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Link />
                    <Typography
                      variant="input.value"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      htttps://ruangmodal.com/profile/
                    </Typography>
                  </InputAdornment>
                ),
              },
            }}
            helperText="0/15"
          />
          <Button variant="contained" sx={{ alignSelf: "start" }}>
            Simpan perubahan
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default ProfileSettings;

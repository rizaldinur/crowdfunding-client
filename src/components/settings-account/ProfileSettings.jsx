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
import { useContext, useEffect, useState } from "react";
import { Link } from "@mui/icons-material";
import { Form, useOutletContext } from "react-router";

function ProfileSettings() {
  const { profileTabData } = useOutletContext();
  const [locationValue, setLocationValue] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const [initialForm, setInitialForm] = useState({
    name: "",
    biography: "",
    location: "",
    uniqueUrl: "",
  });
  const [form, setForm] = useState({
    name: "",
    biography: "",
    location: "",
    uniqueUrl: "",
  });

  useEffect(() => {
    if (profileTabData) {
      const { name = "", biography = "" } = profileTabData || {};
      setForm((form) => {
        return { ...form, name, biography };
      });
      setInitialForm((initialForm) => {
        return { ...initialForm, name, biography };
      });
    }
  }, [profileTabData]);

  useEffect(() => {
    if (JSON.stringify(form) !== JSON.stringify(initialForm)) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [form, initialForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => {
      return { ...form, [name]: value };
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Form noValidate>
          <Stack gap={3} sx={{ width: { xs: 1, md: 500 } }}>
            <TextField
              label="Nama tampilan"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              label="Biografi"
              multiline
              name="biography"
              value={form.biography}
              onChange={handleChange}
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
              onChange={(e, value) => {
                setForm((form) => {
                  return { ...form, location: value || "" };
                });
              }}
            />
            <TextField
              label="URL unik"
              name="uniqueUrl"
              onChange={handleChange}
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
            <Button
              type="submit"
              disabled={!isDirty}
              variant="contained"
              sx={{ alignSelf: "start" }}
            >
              Simpan perubahan
            </Button>
          </Stack>
        </Form>
      </Box>
    </Container>
  );
}

export default ProfileSettings;

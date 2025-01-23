import { ExpandMore, Filter, FilterAlt, RestartAlt } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid2,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFetcher } from "react-router";

function FilterTab() {
  const options = ["Surabaya", "Jakarta"];
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationValue, setLocationValue] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      if (locations.length > 0) {
        return;
      }
      setLoading(true);
      const response = await fetch(
        "https://www.emsifa.com/api-wilayah-indonesia/api/regencies/35.json"
      );
      const data = await response.json();
      console.log(data);

      setLoading(false);

      setLocations([...data]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    if (locations.length > 0) {
      return;
    }
    setLocations([]);
  };
  return (
    <Box
      component="nav"
      sx={{ borderBottom: "1px solid", borderBottomColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Grid2
          container
          sx={{
            py: 5,
            alignItems: "center",
          }}
          spacing={3}
        >
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={options}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Kategori" />
              )}
              sx={{ flexGrow: 1 }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              open={open}
              value={locationValue}
              onChange={(e, value) => {
                setLocationValue([...value]);
                console.log(value);
              }}
              onOpen={handleOpen}
              onClose={handleClose}
              id="tags-outlined"
              options={locations}
              loading={loading}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Lokasi"
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
              sx={{ flexGrow: 1 }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={options}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Urutkan" />
              )}
              sx={{ flexGrow: 1 }}
            />
          </Grid2>
          <Grid2 color="text.primary" size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ButtonGroup
              variant="outlined"
              sx={{ width: 1 }}
              size="medium"
              color="inherit"
            >
              <Button startIcon={<FilterAlt />} sx={{ flexGrow: 1 }}>
                apply
              </Button>
              <Button startIcon={<RestartAlt />} sx={{ flexGrow: 1 }}>
                reset
              </Button>
              <Button startIcon={<ExpandMore />} sx={{ flexGrow: 1 }}>
                expand
              </Button>
            </ButtonGroup>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default FilterTab;

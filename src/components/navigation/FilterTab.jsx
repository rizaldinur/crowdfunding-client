import { ExpandMore, Filter, FilterAlt, RestartAlt } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useFetcher, useSearchParams } from "react-router";
import CategoryAutocomplete from "../input/CategoryAutoComplete";
import LocationAutocomplete from "../input/LocationAutocomplete";

function FilterTab() {
  const options = ["Surabaya", "Jakarta"];

  // const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [search, setSearch] = useSearchParams();
  const [locationValue, setLocationValue] = useState("");
  const [category, setCategory] = useState("");

  const handleReset = (e) => {
    setLocationValue("");
    setCategory("");
  };

  const handleClick = (e) => {
    console.log("click");
    setSearch((search) => {
      search.delete("category");
      search.delete("location");

      if (category) {
        search.set("category", category);
      }
      if (locationValue) {
        search.set("location", locationValue);
      }

      return search;
    });
  };
  return (
    <Box
      component="nav"
      sx={{ borderBottom: "1px solid", borderBottomColor: "divider" }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          sx={{
            py: 5,
            alignItems: "center",
          }}
          spacing={3}
        >
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CategoryAutocomplete
              label="Kategori"
              value={category}
              onChange={(e, value) => {
                setCategory(value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <LocationAutocomplete
              label="Lokasi"
              value={locationValue}
              onChange={(e, value) => {
                setLocationValue(value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
          </Grid>
          <Grid
            color="text.primary"
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ alignSelf: "stretch" }}
          >
            <ButtonGroup
              variant="outlined"
              sx={{ width: 1, height: 1 }}
              size="medium"
              color="inherit"
            >
              <Button
                onClick={handleClick}
                startIcon={<FilterAlt />}
                sx={{ flexGrow: 1 }}
              >
                terapkan
              </Button>
              <Button
                onClick={handleReset}
                startIcon={<RestartAlt />}
                sx={{ flexGrow: 1 }}
              >
                reset
              </Button>
              <Button startIcon={<ExpandMore />} sx={{ flexGrow: 1 }}>
                perluas
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FilterTab;

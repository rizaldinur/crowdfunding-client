import { ExpandMore, Filter, FilterAlt, RestartAlt } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid2,
  TextField,
} from "@mui/material";

function FilterTab() {
  const options = ["Surabaya", "Jakarta"];
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
              defaultValue={options[0].name}
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
              id="tags-outlined"
              options={options}
              getOptionLabel={(option) => option}
              defaultValue={options[0].name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Lokasi" />}
              sx={{ flexGrow: 1 }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={options}
              getOptionLabel={(option) => option}
              defaultValue={options[0].name}
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

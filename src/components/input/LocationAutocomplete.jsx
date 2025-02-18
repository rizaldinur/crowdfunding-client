import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";

function LocationAutocomplete({ sx, handleLocationChange, label }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationValue, setLocationValue] = useState(null);

  const handleLocationsOpen = () => {
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

  const handleLocationsClose = () => {
    setOpen(false);
    if (locations.length > 0) {
      return;
    }
    setLocations([]);
  };

  return (
    <Autocomplete
      id="locationOptions"
      sx={sx ? sx : null}
      options={locations}
      open={open}
      value={locationValue}
      loading={loading}
      autoComplete
      onOpen={handleLocationsOpen}
      onClose={handleLocationsClose}
      onChange={(e, value) => {
        setLocationValue(value);
        console.log(value);
        return handleLocationChange(value?.name);
      }}
      getOptionKey={(option) => option.id}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ? label : "Pilih lokasi"}
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
    />
  );
}

export default LocationAutocomplete;

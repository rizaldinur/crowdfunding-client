import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState } from "react";

function LocationAutocomplete({ onChange, label, name, ...props }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

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
      {...props}
      freeSolo={false}
      options={locations.map((location) => location.name)}
      open={open}
      loading={loading}
      onOpen={handleLocationsOpen}
      onClose={handleLocationsClose}
      onChange={(e, value) => {
        onChange(e, value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || "Pilih lokasi"}
          name={name}
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

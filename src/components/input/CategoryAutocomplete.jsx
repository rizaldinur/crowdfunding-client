import { Autocomplete, TextField } from "@mui/material";
import { businessCategories } from "../../data/staticData";

function CategoryAutocomplete({ label, ...props }) {
  return (
    <Autocomplete
      freeSolo={false}
      selectOnFocus
      autoHighlight
      openOnFocus
      options={businessCategories}
      renderInput={(params) => (
        <TextField {...params} label={label || "Pilih kategori"} />
      )}
    />
  );
}

export default CategoryAutocomplete;

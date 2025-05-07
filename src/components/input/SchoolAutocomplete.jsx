import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

const fetchSchoolsData = async () => {
  const endpoint1 =
    "https://api-sekolah-indonesia.vercel.app/sekolah/SMA?provinsi=050000&perPage=1488";
  const endpoint2 =
    "https://api-sekolah-indonesia.vercel.app/sekolah/SMK?provinsi=050000&perPage=1927";

  const [data1, data2] = await Promise.all([
    fetch(endpoint1).then((res) => res.json()),
    fetch(endpoint2).then((res) => res.json()),
  ]);

  return [...data1.dataSekolah, ...data2.dataSekolah]; // Combine the data arrays
};

function SchoolAutocomplete({
  setSchoolValue,
  label,
  error,
  helperText,
  ...props
}) {
  const [inputValue, setInputValue] = useState("");
  const [schools, setSchools] = useState([]);
  const [loadingSchool, setLoadingSchool] = useState(false);
  const [onDebounce, setOnDebounce] = useState(false);

  // Debounce the fetch function
  const debouncedFilter = debounce((query) => {
    if (!query) {
      setSchools([]);
      return;
    }

    (async () => {
      setLoadingSchool(true);
      const data = await fetchSchoolsData();

      const filtered = data.filter((item) =>
        item.sekolah.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filtered);
      setSchools([...filtered]);
      setLoadingSchool(false);
      setOnDebounce(false);
    })();
  }, 1000);

  useEffect(() => {
    if (inputValue) {
      debouncedFilter(inputValue);
    } else {
      setSchools([]); // Clear options if input is empty
    }

    // Cleanup debounce on unmount
    return () => {
      debouncedFilter.cancel();
    };
  }, [inputValue]);
  return (
    <Autocomplete
      {...props}
      freeSolo={false}
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      noOptionsText={"Ketik dan tunggu hasilnya."}
      filterSelectedOptions={false}
      options={schools.map((school) => {
        return { id: school.id, other: false, sekolah: school.sekolah };
      })}
      loading={loadingSchool}
      onClose={() => {
        setLoadingSchool(false);
        debouncedFilter.cancel();
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setSchoolValue(null);
          return;
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setSchoolValue({
            id: null,
            other: true,
            sekolah: newValue.inputValue.toUpperCase(),
          });
        } else {
          setSchoolValue(newValue);
        }
      }}
      onInputChange={(event, newValue) => {
        if (newValue.toLowerCase() !== inputValue.toLowerCase()) {
          setOnDebounce(true);
          setInputValue(newValue.trim());
        }
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }

        return option.sekolah;
      }}
      getOptionKey={(option) => option.id || option.name}
      filterOptions={(options, params) => {
        const { inputValue } = params;

        if (inputValue !== "" && options.length === 0 && !onDebounce) {
          options.push({
            inputValue: inputValue.trim(),
            sekolah: `Tambahkan "${inputValue.toUpperCase()}"`,
          });
        }
        return options;
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            {option.sekolah}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || "Nama sekolah"}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingSchool ? (
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

export default SchoolAutocomplete;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";

function CustomPasswordTextField({ onChange, sx, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      sx={{
        "input::-ms-reveal": {
          display: "none",
        },
        ...sx,
      }}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e);
      }}
      slotProps={{
        input: {
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default CustomPasswordTextField;

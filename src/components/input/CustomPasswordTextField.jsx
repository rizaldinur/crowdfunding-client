import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";

function CustomPasswordTextField({ value, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const password = useMemo(() => {
    return value;
  }, [value]);

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
      value={value}
      type={showPassword ? "text" : "password"}
      sx={{
        "input::-ms-reveal": {
          display: "none",
        },
      }}
      slotProps={{
        input: {
          endAdornment: password && (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
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

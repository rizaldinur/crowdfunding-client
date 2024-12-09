import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#03e477",
    },
    secondary: {
      main: "#448aff",
    },
    background: {
      default: "#0F1214",
      paper: "#11171D",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#03e477",
    },
    secondary: {
      main: "#448aff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#eeeeee",
    },
  },
});

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export default themes;

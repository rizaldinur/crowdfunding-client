import { CircularProgress, Stack, Typography } from "@mui/material";
import ThemeContainer from "../ThemeContainer";
import { useMemo, useState } from "react";
import themes from "../../styles/themes";
import useThemeContext from "../../hooks/useThemeContext";

function LoadingPage({ withLabel = true }) {
  // const [currentTheme] = useState(localStorage.getItem("theme") || "light");
  const { currentTheme } = useThemeContext();

  const activeTheme = useMemo(() => themes[currentTheme], [currentTheme]);

  return (
    <ThemeContainer
      activeTheme={activeTheme}
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <Stack sx={{ alignItems: "center" }} gap={2}>
        <CircularProgress />
        {withLabel && (
          <Typography variant="h5" color="textPrimary">
            {" "}
            Sedang memuat halaman...
          </Typography>
        )}
      </Stack>
    </ThemeContainer>
  );
}

export default LoadingPage;

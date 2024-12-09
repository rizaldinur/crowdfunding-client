import { ThemeProvider, Container } from "@mui/material";
import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import themes from "../../themes";
import ThemeContainer from "../../components/ThemeContainer";

function RootLayout() {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const activeTheme = useMemo(() => themes[currentTheme], [currentTheme]);

  function handleThemeChange() {
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    console.log(nextTheme);
    localStorage.setItem("theme", nextTheme);
    setCurrentTheme(nextTheme);
  }

  return (
    <ThemeContainer activeTheme={activeTheme}>
      <Outlet context={[currentTheme, handleThemeChange]} />
    </ThemeContainer>
  );
}

export default RootLayout;

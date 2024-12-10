import { createContext, useMemo, useState } from "react";
import { Outlet } from "react-router";
import themes from "../../themes";
import ThemeContainer from "../../components/ThemeContainer";

export const ThemeContext = createContext(
  localStorage.getItem("theme") || "light"
);

function RootLayout({ children }) {
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
      <ThemeContext.Provider value={{ currentTheme, handleThemeChange }}>
        {children ? (
          children
        ) : (
          <Outlet context={[currentTheme, handleThemeChange]} />
        )}
      </ThemeContext.Provider>
    </ThemeContainer>
  );
}

export default RootLayout;

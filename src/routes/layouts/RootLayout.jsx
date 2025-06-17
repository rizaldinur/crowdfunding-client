import { createContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
import themes from "../../styles/themes";
import ThemeContainer from "../../components/ThemeContainer";
import Cookies from "js-cookie";

export const ThemeContext = createContext(
  localStorage.getItem("theme") || "light"
);

export const AuthContext = createContext(null);

function RootLayout({ children }) {
  const [currentTheme, setCurrentTheme] = useState(getPreferredTheme());
  const [token, setToken] = useState(null);

  //handle theming
  function getPreferredTheme() {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;

    // "system" or not set at all
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "theme" && e.newValue !== null) {
        setCurrentTheme(e.newValue);
      } else if (e.key === "theme" && e.newValue === null)
        setCurrentTheme(getPreferredTheme());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(null);
    window.location.reload();
  };

  const activeTheme = useMemo(() => themes[currentTheme], [currentTheme]);

  function handleThemeChange() {
    const nextTheme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("theme", nextTheme);
    setCurrentTheme(nextTheme);
  }

  return (
    <ThemeContainer activeTheme={activeTheme}>
      <ThemeContext.Provider
        value={{ currentTheme, setCurrentTheme, handleThemeChange }}
      >
        <AuthContext.Provider value={{ token, setToken, handleLogout }}>
          {children ? (
            children
          ) : (
            <Outlet context={[currentTheme, handleThemeChange]} />
          )}
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </ThemeContainer>
  );
}

export default RootLayout;

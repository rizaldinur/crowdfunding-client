import { createContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
import themes from "../../themes";
import ThemeContainer from "../../components/ThemeContainer";
import Cookies from "js-cookie";

export const ThemeContext = createContext(
  localStorage.getItem("theme") || "light"
);

export const AuthContext = createContext(null);

function RootLayout({ children }) {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [token, setToken] = useState(null);

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
    console.log(nextTheme);
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

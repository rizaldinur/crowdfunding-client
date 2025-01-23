import { useContext } from "react";
import { ThemeContext } from "../routes/layouts/RootLayout";

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;

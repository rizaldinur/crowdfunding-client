import { useContext } from "react";
import { AuthContext } from "../routes/layouts/RootLayout";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;

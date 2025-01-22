import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "./layouts/RootLayout";
import { useContext, useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  return children ? children : <Outlet />;
}

export default ProtectedRoutes;

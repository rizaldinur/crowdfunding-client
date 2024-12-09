import { Navigate, Outlet } from "react-router";

function ProtectedRoutes({ children }) {
  //get param profile id
  //get user context
  if (!user) return <Navigate to="/login" />;

  return children ? children : <Outlet />;
}

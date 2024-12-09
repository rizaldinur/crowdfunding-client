import { Navigate, Outlet } from "react-router";

function ProtectedRoutes({ user, children }) {
  //get param profile id
  //get user context
  if (!user) return <Navigate to="/login" />;

  return children ? children : <Outlet />;
}

export default ProtectedRoutes;

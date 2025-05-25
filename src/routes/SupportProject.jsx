import {
  Await,
  data,
  Navigate,
  useLoaderData,
  useLocation,
} from "react-router";
import { authenticateJWT } from "../api/auth";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import SupportProjectMain from "../components/support-project/SupportProjectMain";
import { getToken, setToken } from "../utils/utils";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "../components/fallback-component/LoadingPage";
import { Alert, Snackbar } from "@mui/material";

function SupportProject() {
  const { authData } = useLoaderData();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    document.title = "Dukung Proyek";
    if (location.state?.alert) {
      setOpen(true);
      setAlertMsg(location.state?.alert?.message);
    }
  }, []);
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={location.state?.alert?.status || "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMsg || "Terjadi kesalahan."}
        </Alert>
      </Snackbar>
      <AuthNav />
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={authData}>
          {(authData) => {
            useEffect(() => {
              if (authData && authData.data?.refreshToken) {
                setToken(authData.data?.refreshToken);
              }
            }, []);
            if (authData && authData.error) {
              return <Navigate to="/login" state={{ from: location }} />;
            }
            return <SupportProjectMain />;
          }}
        </Await>
      </Suspense>
      <MainFooter borderTop />
    </>
  );
}

export const supportProjectPageLoader = () => {
  const token = getToken();
  return { authData: authenticateJWT(token) };
};

export default SupportProject;

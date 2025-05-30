import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useRevalidator,
} from "react-router";
import { Box } from "@mui/material";
import { createContext, Suspense, useEffect, useState } from "react";
import SettingsTabs from "../../components/settings-account/SettingsTabs";
import SettingsHead from "../../components/settings-account/SettingsHead";
import { getSettingTabData } from "../../api/account";
import BasicSectionLoading from "../../components/fallback-component/BasicSectionLoading";
import LoadingPage from "../../components/fallback-component/LoadingPage";
import { authenticateJWT } from "../../api/auth";
import { getToken } from "../../utils/utils";

export const SettingsLayoutContext = createContext();
function SettingsLayout() {
  const location = useLocation();
  const { authGuard } = useLoaderData();
  const revalidator = useRevalidator();
  const [profileTabData, setProfileTabData] = useState(null);
  const [accountTabData, setAccountTabData] = useState(null);

  useEffect(() => {
    document.title = "Pengaturan akun";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!profileTabData || !accountTabData) {
      revalidator.revalidate();
    }
  }, [location, profileTabData, accountTabData]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={authGuard}>
        {(authGuard) => {
          if (authGuard && authGuard.error) {
            return <Navigate to="/login" state={{ from: location }} />;
          }
          return (
            <SettingsLayoutContext.Provider
              value={{
                profileTabData,
                setProfileTabData,
                accountTabData,
                setAccountTabData,
              }}
            >
              <SettingsHead />
              <SettingsTabs />
              <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
                <Outlet />;
              </Box>
            </SettingsLayoutContext.Provider>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const settingsLoader = ({ request }) => {
  return { authGuard: authenticateJWT(getToken()) };
};

export default SettingsLayout;

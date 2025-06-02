import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
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
  // const { authGuard } = useLoaderData();
  const { tabData } = useLoaderData();
  const revalidator = useRevalidator();
  const [profileTabData, setProfileTabData] = useState(null);
  const [accountTabData, setAccountTabData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Pengaturan akun";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!profileTabData || !accountTabData) {
      revalidator.revalidate();
    }
  }, [location]);

  return (
    <>
      <SettingsHead />
      <SettingsTabs />
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={tabData}>
          {(tabData) => {
            useEffect(() => {
              if (tabData) {
                if (!tabData.error) {
                  if (tabData.data?.profileTab && !profileTabData) {
                    setProfileTabData(tabData.data?.profileTab);
                  }

                  if (tabData.data?.accountTab && !accountTabData) {
                    setAccountTabData(tabData.data?.accountTab);
                  }
                }
              }
            }, [tabData]);

            if (tabData && tabData.error) {
              if (tabData.data?.authenticated === false) {
                return <Navigate to="/login" state={{ from: location }} />;
              }
              return <Navigate to="/" replace={true} />;
            }

            return (
              <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
                <Outlet context={{ profileTabData, accountTabData }} />;
              </Box>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export const settingsLoader = ({ request }) => {
  const pathname = new URL(request.url).pathname;
  return {
    // authGuard: authenticateJWT(getToken()),
    tabData: getSettingTabData(pathname),
  };
};

export default SettingsLayout;

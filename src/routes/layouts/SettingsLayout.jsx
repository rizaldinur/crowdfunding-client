import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
  useRevalidator,
  useSearchParams,
} from "react-router";
import { Alert, Box, Snackbar } from "@mui/material";
import { createContext, Suspense, useEffect, useState } from "react";
import SettingsTabs from "../../components/settings-account/SettingsTabs";
import SettingsHead from "../../components/settings-account/SettingsHead";
import { getSettingTabData } from "../../api/account";
import BasicSectionLoading from "../../components/fallback-component/BasicSectionLoading";
import LoadingPage from "../../components/fallback-component/LoadingPage";
import { authenticateJWT } from "../../api/auth";
import { getToken } from "../../utils/utils";
import isEqual from "lodash.isequal";

export const SettingsLayoutContext = createContext();
function SettingsLayout() {
  const location = useLocation();
  const { tabData } = useLoaderData();
  const revalidator = useRevalidator();
  const [profileTabData, setProfileTabData] = useState(null);
  const [accountTabData, setAccountTabData] = useState(null);
  const navigate = useNavigate();
  let [search, setSearch] = useSearchParams();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Sukses.");
  const [alertStatus, setAlertStatus] = useState("success");

  useEffect(() => {
    if (search.get("success") === "true") {
      setAlertOpen(true);
      setAlertMsg(search.get("message") || "Sukses.");
      setAlertStatus("success");
      setSearch({});
      if (!location.pathname.split("/")[3] && profileTabData) {
        setProfileTabData(null);
      }
      if (location.pathname.split("/")[3] === "account" && accountTabData) {
        setAccountTabData(null);
      }
    }
  }, [search]);

  useEffect(() => {
    document.title = "Pengaturan akun";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!profileTabData || !accountTabData) {
      revalidator.revalidate();
    }
  }, [location]);

  const handleClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        onClose={handleClose}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          open={alertOpen}
          onClose={handleClose}
          variant="filled"
          severity={alertStatus}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <SettingsHead />
      <SettingsTabs />
      <Suspense fallback={<LoadingPage />}>
        <Await resolve={tabData}>
          {(tabData) => {
            useEffect(() => {
              if (tabData) {
                if (!tabData.error) {
                  if (
                    tabData.data?.profileTab &&
                    !isEqual(tabData.data?.profileTab, profileTabData)
                  ) {
                    setProfileTabData(tabData.data?.profileTab);
                  }

                  if (
                    tabData.data?.accountTab &&
                    !isEqual(tabData.data?.accountTab, accountTabData)
                  ) {
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
                <Outlet
                  context={{
                    profileTabData,
                    accountTabData,
                    setAlertMsg,
                    setAlertOpen,
                    setAlertStatus,
                  }}
                />
                ;
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

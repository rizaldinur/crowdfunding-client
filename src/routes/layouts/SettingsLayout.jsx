import { Outlet, useLocation } from "react-router";
import { Box } from "@mui/material";
import { useEffect } from "react";
import SettingsTabs from "../../components/settings-account/SettingsTabs";
import SettingsHead from "../../components/settings-account/SettingsHead";

function SettingsLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  document.title = "Pengaturan akun";
  return (
    <>
      <SettingsHead />
      <SettingsTabs />
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Outlet />
      </Box>
    </>
  );
}

export default SettingsLayout;

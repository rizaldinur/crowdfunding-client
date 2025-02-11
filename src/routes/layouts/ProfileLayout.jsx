import { Outlet, useLocation } from "react-router";
import ProfileTabs from "../../components/profile/ProfileTabs";
import { Box } from "@mui/material";
import { useEffect } from "react";
import ProfileHead from "../../components/profile/ProfileHead";

function ProfileLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  document.title = "Profil";
  return (
    <>
      <ProfileHead />
      <ProfileTabs />
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Outlet />
      </Box>
    </>
  );
}

export default ProfileLayout;

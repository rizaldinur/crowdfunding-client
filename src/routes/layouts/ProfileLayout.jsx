import { Outlet, useLocation } from "react-router";
import ProfileTabs from "../../components/profile/ProfileTabs";
import { Box } from "@mui/material";
import { useEffect } from "react";
import ProfileHead from "../../components/profile/ProfileHead";

function ProfileLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profil";
  }, [location]);

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

const getProfileHeader = async () => {
  const response = await fetch();
};

export const loaderProfileLayout = ({ params }) => {
  const { profileId } = params;
  console.log(params);
};

export default ProfileLayout;

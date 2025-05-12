import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router";
import ProfileTabs from "../../components/profile/ProfileTabs";
import { Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import ProfileHead from "../../components/profile/ProfileHead";
import LoadingPage from "../../components/LoadingPage";
import Cookies from "js-cookie";

function ProfileLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profil";
  }, [location]);

  const { profileHeader } = useLoaderData();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={profileHeader}>
        {(profileHeader) => {
          if (profileHeader.error) {
            return <Navigate to="/" />;
          }
          return (
            <>
              <ProfileHead
                avatar={profileHeader.data?.avatar}
                userName={profileHeader.data?.userName}
                totalSupportedProjects={
                  profileHeader.data?.totalSupportedProjects
                }
                joinDate={profileHeader.data?.joinDate}
              />
              ;
              <ProfileTabs authorized={profileHeader.data?.authorized} />
              <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
                <Outlet />
              </Box>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

const getProfileHeader = async (profileId) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  let baseUrl = "http://localhost:8000";
  let endpoint = `${baseUrl}/${profileId}/profile-header`;
  let token = Cookies.get("jwt") || "";
  const response = await fetch(endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const loaderProfileLayout = ({ params }) => {
  const { profileId } = params;
  return {
    profileHeader: getProfileHeader(profileId),
  };
};

export default ProfileLayout;

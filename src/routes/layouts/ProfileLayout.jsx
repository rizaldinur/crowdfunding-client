import {
  Await,
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router";
import ProfileTabs from "../../components/profile/ProfileTabs";
import { Alert, Box, Button, IconButton, Snackbar } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import ProfileHead from "../../components/profile/ProfileHead";
import LoadingPage from "../../components/LoadingPage";
import Cookies from "js-cookie";

function ProfileLayout() {
  const location = useLocation();
  const [search, setSearchParams] = useSearchParams();
  const [alertOpen, setAlertOpen] = useState(
    search.get("success") === "1" || false
  );

  let message = search.get("message");
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Profil";
  }, [location]);

  const { profileHeader } = useLoaderData();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={profileHeader}>
        {(profileHeader) => {
          useEffect(() => {
            document.title = `Profil ${profileHeader.data.userName}`;
          }, [profileHeader]);
          if (profileHeader.error) {
            return <Navigate to="/" />;
          }
          return (
            <>
              <Snackbar
                open={alertOpen}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => {
                  setAlertOpen(false);
                }}
              >
                <Alert
                  variant="filled"
                  severity={"success"}
                  onClose={() => {
                    setAlertOpen(false);
                  }}
                >
                  {message || "Sukses."}
                </Alert>
              </Snackbar>
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
              <Outlet
                context={{ authorized: profileHeader.data?.authorized }}
              />
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

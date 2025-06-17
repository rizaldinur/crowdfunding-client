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
import LoadingPage from "../../components/fallback-component/LoadingPage";
import { getProfileHeader } from "../../api/account";

function ProfileLayout() {
  const location = useLocation();
  const [search, setSearchParams] = useSearchParams();
  const [alertOpen, setAlertOpen] = useState(
    search.get("success") === "1" || false
  );

  let message = search.get("message");
  useEffect(() => {
    window.scrollTo(0, 0);
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
                countSupportedProjects={
                  profileHeader.data?.countSupportedProjects
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

export const loaderProfileLayout = ({ params }) => {
  const { profileId } = params;
  return {
    profileHeader: getProfileHeader(profileId),
  };
};

export default ProfileLayout;

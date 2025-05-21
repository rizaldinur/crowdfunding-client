import { Alert, Button, Divider, IconButton, Snackbar } from "@mui/material";
import OverviewHead from "../components/build-overview/OverviewHead";
import OverviewMain from "../components/build-overview/OverviewMain";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  Navigate,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
  useLocation,
} from "react-router";
import Cookies from "js-cookie";
import LoadingPage from "../components/LoadingPage";
import { getToken, setToken } from "../utils/utils";
import { FormSubmitContext } from "../hooks/useFormSubmitContext";
import { Close } from "@mui/icons-material";
import {
  deleteProject,
  getBuildOverviewData,
  putLaunchProject,
  putReviewProject,
} from "../api/build";

function BuildOverview() {
  const actionData = useActionData();
  const { data } = useLoaderData();
  const location = useLocation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Ringkasan";
  }, []);

  useEffect(() => {
    if (actionData && actionData.error) {
      setAlertOpen(true);
      setAlertMsg(actionData.message);
      setSuccess(false);
    }
  }, [actionData]);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={data}>
        {(data) => {
          useEffect(() => {
            if (data.data?.refreshToken) {
              setToken(data.data?.refreshToken);
            }
            document.title = `Ringkasan ` + data.data?.projectName;
          }, [data]);

          if (data.error) {
            if (
              Object.hasOwn(data.data, "authenticated") &&
              !data.data?.authenticated
            ) {
              return <Navigate to="/login" state={{ from: location }} />;
            }
            return <Navigate to="/" />;
          }

          return (
            <FormSubmitContext.Provider
              value={{ setAlertMsg, setSuccess, setAlertOpen }}
            >
              <AuthNav
                accountMenu={{
                  slug: data.data.creatorSlug,
                  avatar: data.data.creatorAvatar,
                }}
              />
              <Snackbar
                open={alertOpen}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={() => {
                  setAlertOpen(false);
                }}
              >
                <Alert
                  variant="filled"
                  severity={!success ? "error" : "success"}
                  onClose={() => setAlertOpen(false)}
                >
                  {alertMsg || "Sukses."}
                </Alert>
              </Snackbar>
              <OverviewHead
                status={data.data.projectStatus}
                projectName={data.data.projectName}
                creatorName={data.data.creatorName}
              />
              <OverviewMain data={data.data} />
              <Divider />
              <MainFooter />
            </FormSubmitContext.Provider>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const buildOverviewLoader = ({ request, params }) => {
  const pathname = new URL(request.url).pathname;

  return {
    data: getBuildOverviewData(pathname),
  };
};

export const buildOverviewAction = async ({ request, params }) => {
  let deletePath = `/${params.profileId}/${params.projectId}/delete`;
  let reviewPath = `${new URL(request.url).pathname}/review`;
  let launchPath = `${new URL(request.url).pathname}/launch`;
  let formData = await request.formData();
  let { _action } = Object.fromEntries(formData);

  if (_action === "delete") {
    const data = await deleteProject(deletePath);
    if (data.error) {
      return data;
    }
    return redirect(
      `/profile/${params.profileId}/projects?success=1&message=${data.message}`
    );
  } else if (_action === "review") {
    // console.log(reviewPath);
    const data = await putReviewProject(reviewPath);
    return data;
  } else if (_action === "launch") {
    let postData = Object.fromEntries(formData);
    const data = await putLaunchProject(launchPath, postData);
    return data;
  }
};

export default BuildOverview;

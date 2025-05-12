import { Divider } from "@mui/material";
import OverviewHead from "../components/build-overview/OverviewHead";
import OverviewMain from "../components/build-overview/OverviewMain";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import { Suspense, useEffect } from "react";
import { Await, Navigate, useLoaderData, useLocation } from "react-router";
import Cookies from "js-cookie";
import { authenticateJWT } from "../api/api";
import LoadingPage from "../components/LoadingPage";
import { setToken } from "../utils/utils";

function BuildOverview() {
  const location = useLocation();
  const { data } = useLoaderData();
  useEffect(() => {
    document.title = "Ringkasan";
  }, []);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={data}>
        {(data) => {
          useEffect(() => {
            console.log(data);
            if (data.data?.refreshToken) {
              setToken(data.data?.refreshToken);
            }
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
            <>
              <AuthNav />
              <OverviewHead />
              <OverviewMain data={data.data} />
              <Divider />
              <MainFooter />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

const getBuildOverviewData = async (profileId, projectId) => {
  let url = `http://localhost:8000/${profileId}/${projectId}/build-overview`;
  let token = Cookies.get("jwt") || "";
  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const buildOverviewLoader = ({ request, params }) => {
  const { profileId, projectId } = params;
  console.log({ profileId, projectId });

  return {
    data: getBuildOverviewData(profileId, projectId),
  };
};

export default BuildOverview;

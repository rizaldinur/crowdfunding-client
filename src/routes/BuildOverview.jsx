import { Divider } from "@mui/material";
import OverviewHead from "../components/build-overview/OverviewHead";
import OverviewMain from "../components/build-overview/OverviewMain";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import { Suspense, useEffect } from "react";
import { Await, Navigate, useLoaderData } from "react-router";
import Cookies from "js-cookie";
import { authenticateJWT } from "../api/api";
import LoadingPage from "../components/LoadingPage";

function BuildOverview() {
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
              Cookies.set("jwt", data.data?.refreshToken, {
                expires: 15 / 1440,
              });
            }
          }, [data]);
          if (!data.data?.authorized || data.error) {
            return <Navigate to="/" />;
          }
          // if (!data.data?.authenticated) {
          //   return <Navigate to="/login" />;
          // }
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

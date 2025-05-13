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
import { getToken, setToken } from "../utils/utils";

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
              <OverviewHead
                projectName={data.data.projectName}
                creatorName={data.data.creatorName}
              />
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

const getBuildOverviewData = async (path) => {
  let url = `http://localhost:8000${path}`;
  let token = getToken();
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
  const pathname = new URL(request.url).pathname;

  return {
    data: getBuildOverviewData(pathname),
  };
};

export default BuildOverview;

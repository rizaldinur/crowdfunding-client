import { Suspense, useEffect, useState } from "react";
import AuthNav from "../components/navigation/AuthNav";
import StartProjectMain from "../components/start-project/StartProjectMain";
import Cookies from "js-cookie";
import {
  Await,
  Navigate,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router";
import LoadingPage from "../components/LoadingPage";
import { setToken } from "../utils/utils";
import { authenticateJWT } from "../api/auth";

function StartProject() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Mulai Proyek";
  }, []);

  const { authData } = useLoaderData();
  let navigate = useNavigate();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={authData}>
        {(authData) => {
          useEffect(() => {
            if (authData.data?.refreshToken) {
              setToken(authData.data.refreshToken);
            }
          }, [authData]);
          if (!authData.data?.authenticated) {
            return <Navigate to="/login" state={{ from: location }} />;
          }
          return (
            <>
              <AuthNav />
              <Outlet />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const startProjectLoader = () => {
  const authData = authenticateJWT(Cookies.get("jwt") || "");
  return { authData };
};

export default StartProject;

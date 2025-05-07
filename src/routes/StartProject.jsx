import { Suspense, useEffect, useState } from "react";
import { authenticateJWT } from "../api/api";
import AuthNav from "../components/navigation/AuthNav";
import StartProjectMain from "../components/start-project/StartProjectMain";
import Cookies from "js-cookie";
import {
  Await,
  Navigate,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router";
import LoadingPage from "../components/LoadingPage";

function StartProject() {
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
            if (!authData.data?.authenticated) {
              navigate("/login");
              return;
            }
            if (authData.data?.refreshToken) {
              Cookies.set("jwt", authData.data.refreshToken, {
                expires: 15 / 1440,
              });
            }
          }, [authData]);
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

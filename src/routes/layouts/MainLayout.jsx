import { Await, Outlet, useLoaderData, useLocation } from "react-router";
import MainHeader from "../../components/navigation/MainHeader";
import MainFooter from "../../components/navigation/MainFooter";
import { Suspense, useEffect, useState } from "react";
import { authenticateJWT } from "../../api/api";
import Cookies from "js-cookie";
import LoadingPage from "../../components/LoadingPage";

function MainLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  let { authData } = useLoaderData();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={authData}>
        {(authData) => {
          useEffect(() => {
            if (authData.data?.authenticated) {
              setAuthenticated(true);
            }
            if (authData.data?.refreshToken) {
              Cookies.set("jwt", authData.data.refreshToken, {
                expires: 15 / 1440,
              });
            }
          }, [authData]);
          return (
            <>
              <MainHeader user={authenticated} />
              <Outlet />
              <MainFooter full />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const mainLayoutLoader = () => {
  const authData = authenticateJWT(Cookies.get("jwt") || "");
  return { authData };
};

export default MainLayout;

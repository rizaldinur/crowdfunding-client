import { Await, Outlet, useLoaderData, useLocation } from "react-router";
import MainHeader from "../../components/navigation/MainHeader";
import MainFooter from "../../components/navigation/MainFooter";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import LoadingPage from "../../components/LoadingPage";
import { authenticateJWT } from "../../api/auth";

function MainLayout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [slug, setSlug] = useState(null);
  const [avatar, setAvatar] = useState(null);

  let { authData } = useLoaderData();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={authData}>
        {(authData) => {
          useEffect(() => {
            if (authData.data?.authenticated) {
              setAuthenticated(true);
              setUser(authData.data.userId);
              setSlug(authData.data.slug);
              setAvatar(authData.data.avatar);
            }
            if (authData.data?.refreshToken) {
              Cookies.set("jwt", authData.data.refreshToken, {
                expires: 15 / 1440,
              });
            }
          }, [authData]);
          return (
            <>
              <MainHeader
                user={user}
                slug={slug}
                avatar={avatar}
                authenticated={authenticated}
              />
              <Outlet />
              <MainFooter full borderTop />
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

import { Suspense, useEffect } from "react";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import SupportStatusMain from "../components/support-status/SupportStatusMain";
import {
  Await,
  Navigate,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router";
import { getSupportStatus, updateSupportStatus } from "../api/support";
import LoadingPage from "../components/fallback-component/LoadingPage";
import { setToken } from "../utils/utils";

function SupportStatus() {
  const [search, setSearch] = useSearchParams();
  const { supportStatus } = useLoaderData();
  const location = useLocation();

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    document.title = "Status";
    if (!search.get("order_id")) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  }, []);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={supportStatus}>
        {(supportStatus) => {
          useEffect(() => {
            if (supportStatus) {
              if (!supportStatus.error) {
                if (supportStatus.data?.refreshToken) {
                  setToken(supportStatus.data?.refreshToken);
                }
              }
            }
          }, []);

          if (supportStatus && supportStatus.error) {
            return <Navigate to={"/login"} />;
          }

          return (
            <>
              <AuthNav
                accountMenu={{
                  avatar: supportStatus.data?.supporterAvatar,
                  slug: supportStatus.data?.supporterSlug,
                }}
              />
              <SupportStatusMain data={supportStatus.data} />
              <MainFooter borderTop />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const supportStatusLoader = ({ request, params }) => {
  const url = new URL(request.url);
  const completePath = url.pathname + url.search;

  return {
    supportStatus: (async () => {
      await updateSupportStatus(url.searchParams.get("order_id"));
      const data = await getSupportStatus(completePath);
      return data;
    })(),
  };
};
export default SupportStatus;

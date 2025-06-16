import {
  Await,
  Navigate,
  Link as RouterLink,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import { createContext, Suspense, useEffect, useState } from "react";
import SupportProjectOverviewMain from "../components/support-project-overview/SupportProjectOverviewMain";
import { getToken, setToken } from "../utils/utils";
import LoadingPage from "../components/fallback-component/LoadingPage";
import {
  deleteSupport,
  getSupportOverviewData,
  postSupportProject,
  updateSupportStatus,
} from "../api/support";

export const SupportOverviewContext = createContext();

function SupportProjectOverview() {
  const { supportOverviewData } = useLoaderData();
  const fetcher = useFetcher();
  const location = useLocation();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(location.state?.amount);
  const navigate = useNavigate();
  const backLink = `/support/${params.profileId}/${params.projectId}`;

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
    document.title = "Ringkasan dukungan";
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      console.log(fetcher.data);
      if (!fetcher.data?.error) {
        window.snap.pay(fetcher.data?.data?.transaction?.token, {
          onSuccess: function (result) {
            navigate(
              `../support/status?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`
            );
            updateSupportStatus(fetcher.data?.data?.supportId);
          },
          onPending: function (result) {
            navigate(
              `../support/status?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`
            );
            updateSupportStatus(fetcher.data?.data?.supportId);
          },
          onError: function (result) {
            navigate(
              `../support/status?order_id=${result.order_id}&status_code=${result.status_code}&transaction_status=${result.transaction_status}`
            );
            updateSupportStatus(fetcher.data?.data?.supportId);
          },
          onClose: function () {
            deleteSupport(fetcher.data?.data?.supportId);
            alert("Pembayaran tidak selesai.");
          },
        });
      }
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (fetcher.state === "idle") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [fetcher.state]);

  if (!amount) {
    return (
      <Navigate
        to={backLink}
        state={{
          alert: {
            status: "error",
            message: "Masukkan jumlah dukungan.",
          },
        }}
      />
    );
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={supportOverviewData}>
        {(supportOverviewData) => {
          useEffect(() => {
            if (supportOverviewData && supportOverviewData.data?.refreshToken) {
              setToken(supportOverviewData.data?.refreshToken);
            }
          }, []);

          if (supportOverviewData && supportOverviewData.error) {
            return <Navigate to="/login" state={{ from: location }} />;
          }

          return (
            <SupportOverviewContext.Provider
              value={{ backLink, amount, loading }}
            >
              <AuthNav />
              <fetcher.Form id="formSupportProject" method="post">
                <input type="hidden" name="supportAmount" value={amount} />
              </fetcher.Form>
              <SupportProjectOverviewMain
                data={supportOverviewData.data?.overviewData}
              />
              <MainFooter borderTop />
            </SupportOverviewContext.Provider>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const supportOverviewLoader = ({ request }) => {
  const pathname = new URL(request.url).pathname;

  return { supportOverviewData: getSupportOverviewData(pathname) };
};

export const supportOverviewAction = async ({ request, params }) => {
  const pathname = `/support/${params.profileId}/${params.projectId}/checkout`;
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  console.log(postData);

  const data = await postSupportProject(postData, pathname);
  return data;
};

export default SupportProjectOverview;

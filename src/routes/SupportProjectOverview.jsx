import {
  Await,
  Navigate,
  Link as RouterLink,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { numericFormatter } from "react-number-format";
import { yellow } from "@mui/material/colors";
import { createContext, Suspense, useEffect, useState } from "react";
import SupportProjectOverviewMain from "../components/support-project-overview/SupportProjectOverviewMain";
import { authenticateJWT } from "../api/auth";
import { getToken, setToken } from "../utils/utils";
import LoadingPage from "../components/fallback-component/LoadingPage";
import { getSupportOverviewData } from "../api/support";

export const SupportOverviewContext = createContext();

function SupportProjectOverview() {
  const { supportOverviewData } = useLoaderData();
  const location = useLocation();
  console.log(location);

  const params = useParams();
  const [amount, setAmount] = useState(location.state?.amount);
  const backLink = `/support/${params.profileId}/${params.projectId}`;

  useEffect(() => {
    document.title = "Ringkasan dukungan";
  }, []);

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
            <SupportOverviewContext.Provider value={{ backLink, amount }}>
              <AuthNav />
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

export default SupportProjectOverview;

import { Divider } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import MainFooter from "../../components/navigation/MainFooter";
import BuildPageNav from "../../components/navigation/BuildPageNav";
import BuildTabs from "../../components/build-page/BuildTabs";
import { FormSubmitContext } from "../../hooks/useFormSubmitContext";
import { useEffect, useRef, useState } from "react";
import { setToken } from "../../utils/utils";
import LoadingPage from "../../components/fallback-component/LoadingPage";
import { getFilledForm } from "../../api/build";

function BuildProjectLayout() {
  const location = useLocation();
  const submitFnRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [newUserSlug, setNewUserSlug] = useState("");

  const [filledData, setFilledData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      const data = await getFilledForm(location.pathname);
      setFilledData(data);
      setLoadingData(false);
    }
    loadData();
  }, [location]);

  useEffect(() => {
    if (filledData) {
      if (filledData.data?.refreshToken) {
        setToken(filledData.data?.refreshToken);
      }
    }
  }, [filledData]);

  if (filledData && !loadingData && filledData.error) {
    if (
      Object.hasOwn(filledData.data, "authenticated") &&
      !filledData.data?.authenticated
    ) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return <Navigate to="/" />;
  }

  return (
    <FormSubmitContext.Provider
      value={{
        submitFnRef,
        loading,
        setLoading,
        isDirty,
        setIsDirty,
        newSlug,
        setNewSlug,
        newUserSlug,
        setNewUserSlug,
      }}
    >
      <BuildPageNav />
      <BuildTabs />

      {filledData && !loadingData ? (
        <Outlet context={filledData} />
      ) : (
        <LoadingPage />
      )}
      <MainFooter borderTop />
    </FormSubmitContext.Provider>
  );
}

export default BuildProjectLayout;

import { Container, Divider } from "@mui/material";
import { Outlet } from "react-router";
import MainFooter from "../../components/navigation/MainFooter";
import BuildPageNav from "../../components/navigation/BuildPageNav";
import BuildTabs from "../../components/build/BuildTabs";
import { FormSubmitContext } from "../../hooks/useFormSubmitContext";
import { useRef, useState } from "react";

function BuildProjectLayout() {
  const submitFnRef = useRef(null);
  const [loading, setLoading] = useState(false);

  return (
    <FormSubmitContext.Provider value={{ submitFnRef, loading, setLoading }}>
      <BuildPageNav />
      <BuildTabs />
      <Outlet />
      <Divider />
      <MainFooter />
    </FormSubmitContext.Provider>
  );
}

export default BuildProjectLayout;

import { Container, Divider } from "@mui/material";
import { Outlet } from "react-router";
import MainFooter from "../../components/navigation/MainFooter";
import BuildPageNav from "../../components/navigation/BuildPageNav";
import BuildTabs from "../../components/build/BuildTabs";
import { FormSubmitContext } from "../../hooks/useFormSubmitContext";
import { useRef } from "react";

function BuildProjectLayout() {
  const submitFnRef = useRef(null);

  return (
    <FormSubmitContext.Provider value={submitFnRef}>
      <BuildPageNav />
      <BuildTabs />
      <Outlet />
      <Divider />
      <MainFooter />
    </FormSubmitContext.Provider>
  );
}

export default BuildProjectLayout;

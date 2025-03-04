import { Divider } from "@mui/material";
import OverviewHead from "../components/build-overview/OverviewHead";
import OverviewMain from "../components/build-overview/OverviewMain";
import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";

function BuildOverview() {
  document.title = "Ringkasan";
  return (
    <>
      <AuthNav />
      <OverviewHead />
      <OverviewMain />
      <Divider />
      <MainFooter />
    </>
  );
}

export default BuildOverview;

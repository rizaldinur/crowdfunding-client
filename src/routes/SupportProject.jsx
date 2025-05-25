import AuthNav from "../components/navigation/AuthNav";
import MainFooter from "../components/navigation/MainFooter";
import SupportProjectMain from "../components/support-project/SupportProjectMain";

function SupportProject() {
  return (
    <>
      <AuthNav />
      <SupportProjectMain />
      <MainFooter borderTop />
    </>
  );
}

export default SupportProject;

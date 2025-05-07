import AuthNav from "../components/navigation/AuthNav";
import StartProjectMain from "../components/start-project/StartProjectMain";

function StartProject() {
  return (
    <>
      <AuthNav />
      <StartProjectMain />
    </>
  );
}

export const startProjectLoader = () => {
  const authData = authenticateJWT(Cookies.get("jwt") || "");
  return { authData };
};

export default StartProject;

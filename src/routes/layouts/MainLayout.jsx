import { Outlet } from "react-router";
import MainHeader from "../../components/MainHeader";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
export default MainLayout;

import { Outlet } from "react-router";
import MainHeader from "../../components/navigation/MainHeader";
import MainFooter from "../../components/navigation/MainFooter";

function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <MainFooter full />
    </>
  );
}
export default MainLayout;

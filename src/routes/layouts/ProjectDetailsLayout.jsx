import { Outlet } from "react-router";
import ProjectTabs from "../../components/project-details/ProjectTabs";
import ProjectHead from "../../components/project-details/ProjectHead";

function ProjectDetailsLayout() {
  document.title = "Detail Proyek";
  return (
    <>
      <ProjectHead />
      <ProjectTabs />
      <Outlet />
    </>
  );
}

export default ProjectDetailsLayout;

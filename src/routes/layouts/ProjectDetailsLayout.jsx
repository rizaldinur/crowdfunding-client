import MainFooter from "../../components/navigation/MainFooter";
import MainHeader from "../../components/navigation/MainHeader";
import ProjectTabs from "../../components/project-details/ProejctTabs";
import ProjectHead from "../../components/project-details/ProjectHead";

function ProjectDetailsLayout() {
  return (
    <>
      <ProjectHead />
      <ProjectTabs />
    </>
  );
}

export default ProjectDetailsLayout;

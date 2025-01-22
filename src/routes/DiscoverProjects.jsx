import ProjectsGrid from "../components/discover/ProjectsGrid";
import FilterTab from "../components/navigation/FilterTab";

function DiscoverProjects() {
  document.title = "Jelajahi";
  return (
    <>
      <FilterTab />
      <ProjectsGrid />
    </>
  );
}

export default DiscoverProjects;

import { Outlet, useLocation } from "react-router";
import ProjectTabs from "../../components/project-details/ProjectTabs";
import ProjectHead from "../../components/project-details/ProjectHead";
import { Box } from "@mui/material";
import { useEffect } from "react";

function ProjectDetailsLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  document.title = "Detail Proyek";
  return (
    <>
      <ProjectHead />
      <ProjectTabs />
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
        <Outlet />
      </Box>
    </>
  );
}

export default ProjectDetailsLayout;

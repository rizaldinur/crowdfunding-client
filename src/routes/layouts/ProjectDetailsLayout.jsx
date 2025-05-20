import { Await, Outlet, useLoaderData, useLocation } from "react-router";
import ProjectTabs from "../../components/project-details/ProjectTabs";
import ProjectHead from "../../components/project-details/ProjectHead";
import { Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import BasicSectionLoading from "../../components/loading-template/BasicSectionLoading";
import { getProjectHeader } from "../../api/feed";

function ProjectDetailsLayout() {
  const location = useLocation();
  const { headerData } = useLoaderData();

  useEffect(() => {
    document.title = "Detail proyek";
  }, [location]);
  return (
    <>
      <Suspense fallback={<BasicSectionLoading sx={{ height: 400 }} />}>
        <Await resolve={headerData}>
          {(headerData) => {
            return <ProjectHead data={headerData.data} />;
          }}
        </Await>
      </Suspense>
      <ProjectTabs />
      <Outlet value={"someData"} />
    </>
  );
}

export const projectDetailLayoutLoader = ({ request, params }) => {
  const pathname = `/project/details/${params.profileId}/${params.projectId}/header`;

  return { headerData: getProjectHeader(pathname) };
};

export default ProjectDetailsLayout;

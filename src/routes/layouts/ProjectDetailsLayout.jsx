import { Await, Outlet, useLoaderData, useLocation } from "react-router";
import ProjectTabs from "../../components/project-details/ProjectTabs";
import ProjectHead from "../../components/project-details/ProjectHead";
import { Box } from "@mui/material";
import { createContext, Suspense, useEffect, useState } from "react";
import BasicSectionLoading from "../../components/fallback-component/BasicSectionLoading";
import { getProjectHeader } from "../../api/feed";

export const ProjectDetailsLayoutContext = createContext();

function ProjectDetailsLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { headerData } = useLoaderData();

  return (
    <ProjectDetailsLayoutContext.Provider value={{ open, setOpen }}>
      <Suspense fallback={<BasicSectionLoading sx={{ height: 400 }} />}>
        <Await resolve={headerData}>
          {(headerData) => {
            useEffect(() => {
              if (headerData && !headerData.error) {
                document.title = `${headerData.data.title} ` || "Detail Proyek";
              }
            }, []);

            return <ProjectHead data={headerData.data} />;
          }}
        </Await>
      </Suspense>
      <ProjectTabs />
      <Outlet value={"someData"} />
    </ProjectDetailsLayoutContext.Provider>
  );
}

export const projectDetailLayoutLoader = ({ request, params }) => {
  const pathname = `/project/details/${params.profileId}/${params.projectId}/header`;

  return { headerData: getProjectHeader(pathname) };
};

export default ProjectDetailsLayout;

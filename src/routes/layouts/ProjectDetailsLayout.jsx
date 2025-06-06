import { Await, Outlet, useLoaderData } from "react-router";
import ProjectTabs from "../../components/project-details/ProjectTabs";
import ProjectHead from "../../components/project-details/ProjectHead";
import { createContext, Suspense, useEffect, useState } from "react";
import BasicSectionLoading from "../../components/fallback-component/BasicSectionLoading";
import { getProjectHeader } from "../../api/feed";
import { setToken } from "../../utils/utils";
import { useCacheStore } from "../../data/store";

export const ProjectDetailsLayoutContext = createContext();

function ProjectDetailsLayout() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const { headerData } = useLoaderData();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Sukses.");
  const [alertStatus, setAlertStatus] = useState("success");

  return (
    <ProjectDetailsLayoutContext.Provider
      value={{
        open,
        setOpen,
        role,
        isAuth,
        alertOpen,
        setAlertOpen,
        alertMsg,
        setAlertMsg,
        alertStatus,
        setAlertStatus,
      }}
    >
      <Suspense fallback={<BasicSectionLoading sx={{ height: 400 }} />}>
        <Await resolve={headerData}>
          {(headerData) => {
            const { setData } = useCacheStore.getState();

            useEffect(() => {
              if (headerData && !headerData.error) {
                document.title = `${headerData.data.title} ` || "Detail Proyek";
                setRole(headerData.data?.role || "guest");
                if (headerData.data?.isAuth) {
                  setIsAuth(headerData.data?.isAuth);
                  setData("user", {
                    ...headerData.data?.user,
                    role: headerData.data?.role,
                  });
                }
                if (headerData.data?.refreshToken) {
                  setToken(headerData.data?.refreshToken);
                }
              }
            }, [headerData]);

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

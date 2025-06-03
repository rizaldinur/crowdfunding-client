import { Suspense, useEffect, useState } from "react";
import ProjectsGrid from "../components/discover/ProjectsGrid";
import FilterTab from "../components/navigation/FilterTab";
import { getDiscoverProjects } from "../api/feed";
import { Await, Navigate, useLoaderData } from "react-router";
import LoadingPage from "../components/fallback-component/LoadingPage";
import { Box, Typography } from "@mui/material";

function DiscoverProjects() {
  const { projects } = useLoaderData();
  const [data, setData] = useState(null);

  useEffect(() => {
    document.title = "Jelajahi";
  }, []);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Await resolve={projects}>
        {(projects) => {
          return (
            <>
              <FilterTab />
              {!projects.error &&
              projects.data &&
              projects.data?.totalItems > 0 ? (
                <ProjectsGrid
                  totalPages={projects.data?.totalPages}
                  projects={projects.data?.projects}
                />
              ) : (
                <Typography
                  sx={{ textAlign: "center", placeSelf: "center", py: 4 }}
                  variant="body2"
                  color="textSecondary"
                >
                  {projects.error ? (
                    <>
                      Terjadi kesalahan
                      <br />
                      {projects.message}
                      {` (${projects.status})`}
                    </>
                  ) : (
                    "Tidak ada data."
                  )}
                </Typography>
              )}
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

export const discoverProjectsLoader = ({ request, params }) => {
  const url = new URL(request.url);
  const searchPath = url.search;

  return { projects: getDiscoverProjects(searchPath) };
};
export default DiscoverProjects;

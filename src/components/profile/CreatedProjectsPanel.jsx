import { Container, Stack, Typography } from "@mui/material";
import MinimalCard from "../card/MinimalCard";
import { getToken, setToken } from "../../utils/utils";
import { Suspense, useEffect } from "react";
import { Await, Navigate, useLoaderData } from "react-router";
import ProfilePanelLoading from "./skeleton/ProfilePanelLoading";

function CreatedProjectsPanel() {
  const { data } = useLoaderData();
  return (
    <Suspense fallback={<ProfilePanelLoading />}>
      <Await resolve={data}>
        {(data) => {
          useEffect(() => {
            if (data.data?.refreshToken) {
              setToken(data.data.refreshToken);
            }
          }, [data]);
          if (data.error || !data.data?.authorized) {
            return <Navigate to="../about" />;
          }
          return (
            <Container maxWidth="md">
              <Stack sx={{ py: 4 }} gap={4}>
                {data.data.createdProjects.length > 0 ? (
                  data.data.createdProjects.map((project, index) => {
                    return (
                      <MinimalCard
                        key={"project-" + index}
                        profileId={project.profileId}
                        projectId={project.projectId}
                        projectImage={project.projectImage}
                        projectName={project.projectName}
                        creatorAvatar={project.creatorAvatar}
                        creatorName={project.creatorName}
                        school={project.school}
                        status={project.status}
                        createdAt={project.createdAt}
                      />
                    );
                  })
                ) : (
                  <Typography
                    sx={{ placeSelf: "center" }}
                    color="textSecondary"
                  >
                    Belum ada proyek yang dibuat.
                  </Typography>
                )}
              </Stack>
            </Container>
          );
        }}
      </Await>
    </Suspense>
  );
}

const getProfileCreatedProjects = async (path) => {
  let baseUrl = "http://localhost:8000";
  let url = `${baseUrl}${path}`;
  let token = getToken();
  const response = await fetch(url, {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await response.json();

  return data;
};

export const createdProjectsPanelLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  return { data: getProfileCreatedProjects(pathname) };
};

export default CreatedProjectsPanel;

import { Container, Stack, Typography } from "@mui/material";
import MinimalCard from "../card/MinimalCard";
import { getToken, setToken } from "../../utils/utils";
import { Suspense, useEffect } from "react";
import { Await, Navigate, useLoaderData } from "react-router";
import ProfilePanelLoading from "./skeleton/ProfilePanelLoading";
import { getProfileCreatedProjects } from "../../api/account";

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
            return <Navigate to=".." />;
          }
          return (
            <Container maxWidth="md">
              <Stack sx={{ py: 4 }} gap={4}>
                {data.data.createdProjects.length > 0 ? (
                  data.data.createdProjects.map((project, index) => {
                    return (
                      <MinimalCard
                        key={"project-" + index}
                        data={project}
                        variant="created"
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

export const createdProjectsPanelLoader = ({ request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  return { data: getProfileCreatedProjects(pathname) };
};

export default CreatedProjectsPanel;

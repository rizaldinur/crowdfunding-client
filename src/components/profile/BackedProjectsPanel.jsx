import { Container, Stack, Typography } from "@mui/material";
import MinimalCard from "../card/MinimalCard";
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import BasicSectionLoading from "../fallback-component/BasicSectionLoading";
import { getProfileBackedProjects } from "../../api/account";

function BackedProjectsPanel() {
  const { backedProjects } = useLoaderData();
  return (
    <Suspense fallback={<BasicSectionLoading />}>
      <Await resolve={backedProjects}>
        {(backedProjects) => {
          const backedArray = backedProjects.data?.mappedBacked || [];
          console.log(backedArray);

          if (backedProjects.error || !backedProjects.data?.authorized) {
            return <Navigate to=".." />;
          }

          return (
            <Container maxWidth="md">
              <Stack sx={{ py: 4 }} gap={4}>
                {backedArray.length > 0 ? (
                  backedArray.map((backed, index) => {
                    return (
                      <MinimalCard
                        key={`backed-${index}`}
                        variant="backed"
                        data={backed}
                      />
                    );
                  })
                ) : (
                  <Typography
                    sx={{ placeSelf: "center" }}
                    color="textSecondary"
                  >
                    Belum ada proyek yang didukung.
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

export const backedProjectsLoader = ({ request, params }) => {
  const pathname = new URL(request.url).pathname;

  return { backedProjects: getProfileBackedProjects(pathname) };
};
export default BackedProjectsPanel;

import { OpenInNew } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import ProfilePanelLoading from "./skeleton/ProfilePanelLoading";
import { Await, useLoaderData, useOutletContext } from "react-router";
import { Suspense } from "react";

function AboutPanel() {
  const { authorized } = useOutletContext();
  console.log(authorized);

  const { aboutData } = useLoaderData();

  return (
    <Suspense fallback={<ProfilePanelLoading />}>
      <Await resolve={aboutData}>
        {(aboutData) => {
          return (
            <Container maxWidth="md">
              <Stack direction="row" gap={8} sx={{ py: 4 }}>
                <Typography variant="h6" color="textSecondary">
                  Biografi
                </Typography>
                <Stack
                  alignItems="start"
                  gap={2}
                  color="text.primary"
                  sx={{ placeSelf: "center" }}
                >
                  <Typography color="textSecondary">
                    {aboutData.data?.biography
                      ? aboutData.data.biography
                      : authorized
                      ? "Kamu belum menambahkan biografi."
                      : "Tidak ada biografi."}
                  </Typography>
                  {!aboutData.data?.biography && authorized && (
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<OpenInNew />}
                    >
                      Edit biografi
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Container>
          );
        }}
      </Await>
    </Suspense>
  );
}

const getProfileAbout = async (path) => {
  let baseUrl = "http://localhost:8000";
  let url = `${baseUrl}${path}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const profileAboutLoader = ({ params, request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  return { aboutData: getProfileAbout(pathname) };
};

export default AboutPanel;

import { OpenInNew } from "@mui/icons-material";
import { Button, Container, Link, Stack, Typography } from "@mui/material";
import ProfilePanelLoading from "./skeleton/ProfilePanelLoading";
import {
  Await,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router";
import { Suspense } from "react";
import { Link as RouterLink } from "react-router";
import { getProfileAbout } from "../../api/account";

function AboutPanel() {
  const { authorized } = useOutletContext();
  const { profileId } = useParams();

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
                      component={RouterLink}
                      to={`/settings/${profileId}`}
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

export const profileAboutLoader = ({ params, request }) => {
  const url = new URL(request.url);
  const pathname = url.pathname + "/about";

  return { aboutData: getProfileAbout(pathname) };
};

export default AboutPanel;

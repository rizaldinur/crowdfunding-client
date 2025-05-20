import { Navigate, createBrowserRouter } from "react-router";
import RootLayout from "./routes/layouts/RootLayout.jsx";
import ErrorBoundary from "./routes/ErrorBoundary.jsx";
import Login, { loginAction, loginLoader } from "./routes/Login.jsx";
import Signup, { signupLoader, signupAction } from "./routes/Signup.jsx";
import Index from "./routes/Index.jsx";
import DiscoverProjects from "./routes/DiscoverProjects.jsx";
import MainLayout, { mainLayoutLoader } from "./routes/layouts/MainLayout.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Cookies from "js-cookie";
import StartProject, { startProjectLoader } from "./routes/StartProject.jsx";
import ProjectDetailsLayout, {
  projectDetailLayoutLoader,
} from "./routes/layouts/ProjectDetailsLayout.jsx";
import StoryPanel, {
  storyPanelLoader,
} from "./components/project-details/StoryPanel.jsx";
import { Typography } from "@mui/material";
import UpdatePanel from "./components/project-details/UpdatePanel.jsx";
import FaqsPanel from "./components/project-details/FaqsPanel.jsx";
import CommentsPanel from "./components/project-details/CommentsPanel.jsx";
import AboutPanel, {
  profileAboutLoader,
} from "./components/profile/AboutPanel.jsx";
import ProfileLayout, {
  loaderProfileLayout,
} from "./routes/layouts/ProfileLayout.jsx";
import BackedProjectsPanel from "./components/profile/BackedProjectsPanel.jsx";
import SettingsLayout from "./routes/layouts/SettingsLayout.jsx";
import AccountSettings from "./components/settings-account/AccountSettings.jsx";
import ProfileSettings from "./components/settings-account/ProfileSettings.jsx";
import BuildOverview, {
  buildOverviewAction,
  buildOverviewLoader,
} from "./routes/BuildOverview.jsx";
import LoadingPage from "./components/LoadingPage.jsx";
import StartProjectMain, {
  startProjectMainAction,
} from "./components/start-project/StartProjectMain.jsx";
import CreatedProjectsPanel, {
  createdProjectsPanelLoader,
} from "./components/profile/CreatedProjectsPanel.jsx";
import BuildProjectLayout from "./routes/layouts/BuildProjectLayout.jsx";
import BasicPage, {
  basicBuildAction,
} from "./components/build-page/BasicPage.jsx";
import StoryPage, {
  storyBuildAction,
} from "./components/build-page/StoryPage.jsx";
import ProfilePage, {
  profileBuildAction,
} from "./components/build-page/ProfilePage.jsx";
import PaymentPage, {
  paymentBuildAction,
} from "./components/build-page/PaymentPage.jsx";
import PreviewPageLayout, {
  previewLoader,
} from "./routes/layouts/PreviewPageLayout.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: (
      <RootLayout>
        <ErrorBoundary />
      </RootLayout>
    ),
    children: [
      {
        path: "/",
        element: <MainLayout />,
        loader: mainLayoutLoader,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "discover",
            element: <DiscoverProjects />,
          },
          {
            path: "project/details/:profileId/:projectId",
            element: <ProjectDetailsLayout />,
            loader: projectDetailLayoutLoader,
            children: [
              {
                index: true,
                element: <StoryPanel />,
                loader: storyPanelLoader,
              },
              {
                path: "updates",
                element: <UpdatePanel />,
              },
              {
                path: "updates/:updatesId",
                element: (
                  <Typography color="textPrimary">Hello skibidi</Typography>
                ),
              },
              { path: "comments", element: <CommentsPanel /> },
              { path: "faqs", element: <FaqsPanel /> },
            ],
          },
          {
            path: "profile/:profileId",
            element: <ProfileLayout />,
            loader: loaderProfileLayout,
            children: [
              {
                index: true,
                element: <AboutPanel />,
                loader: profileAboutLoader,
              },
              { path: "backed", element: <BackedProjectsPanel /> },
              // { path: "saved", element: <SavedProjects /> },
              {
                path: "projects",
                element: <CreatedProjectsPanel />,
                loader: createdProjectsPanelLoader,
              },
            ],
          },

          {
            path: "settings/:profileId",
            element: <SettingsLayout />,
            children: [
              { index: true, element: <ProfileSettings /> },
              { path: "account", element: <AccountSettings /> },
            ],
          },
        ],
      },
      {
        path: "/:profileId/:projectId/build-overview/preview",
        element: <PreviewPageLayout />,
        loader: previewLoader,
      },
      {
        path: "/:profileId/:projectId/build-overview",
        element: <BuildOverview />,
        loader: buildOverviewLoader,
        action: buildOverviewAction,
      },
      {
        path: "/:profileId/:projectId/build",
        element: <BuildProjectLayout />,
        children: [
          {
            index: true,
            path: "basic",
            element: <BasicPage />,
            action: basicBuildAction,
          },
          { path: "story", element: <StoryPage />, action: storyBuildAction },
          {
            path: "profile",
            element: <ProfilePage />,
            action: profileBuildAction,
          },
          {
            path: "payment",
            element: <PaymentPage />,
            action: paymentBuildAction,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
        loader: loginLoader,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: signupAction,
        loader: signupLoader,
      },
      {
        path: "/start-project",
        element: <StartProject />,
        children: [
          {
            index: true,
            element: <StartProjectMain />,
            action: startProjectMainAction,
          },
        ],
        loader: startProjectLoader,
      },
    ],
  },
]);

export default router;

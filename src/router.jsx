import { Navigate, createBrowserRouter } from "react-router";
import RootLayout from "./routes/layouts/RootLayout.jsx";
import ErrorBoundary from "./routes/ErrorBoundary.jsx";
import Login, { action as loginAction } from "./routes/Login.jsx";
import Signup, { action as signupAction } from "./routes/Signup.jsx";
import Index from "./routes/Index.jsx";
import DiscoverProjects from "./routes/DiscoverProjects.jsx";
import MainLayout from "./routes/layouts/MainLayout.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Cookies from "js-cookie";
import StartProject from "./routes/StartProject.jsx";
import ProjectDetailsLayout from "./routes/layouts/ProjectDetailsLayout.jsx";
import StoryPanel from "./components/project-details/StoryPanel.jsx";
import { Typography } from "@mui/material";
import UpdatePanel from "./components/project-details/UpdatePanel.jsx";
import FaqsPanel from "./components/project-details/FaqsPanel.jsx";
import CommentsPanel from "./components/project-details/CommentsPanel.jsx";
import AboutPanel from "./components/profile/AboutPanel.jsx";
import ProfileLayout from "./routes/layouts/ProfileLayout.jsx";
import BackedProjectsPanel from "./components/profile/BackedProjectsPanel.jsx";
import SettingsLayout from "./routes/layouts/SettingsLayout.jsx";
import AccountSettings from "./components/settings-account/AccountSettings.jsx";
import ProfileSettings from "./components/settings-account/ProfileSettings.jsx";
import BuildOverview from "./routes/BuildOverview.jsx";

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
            path: "project/details/:projectId",
            element: <ProjectDetailsLayout />,
            children: [
              { index: true, element: <Navigate to="story" /> },
              { path: "story", element: <StoryPanel /> },
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
            children: [
              { index: true, element: <Navigate to="about" /> },
              { path: "about", element: <AboutPanel /> },
              { path: "backed", element: <BackedProjectsPanel /> },
              // { path: "saved", element: <SavedProjects /> },
              // { path: "projects", element: <CreatedProjects /> },
            ],
          },

          {
            path: "settings/:profileId",
            element: <SettingsLayout />,
            children: [
              { index: true, element: <Navigate to="profile" /> },
              { path: "profile", element: <ProfileSettings /> },
              { path: "account", element: <AccountSettings /> },
            ],
          },
        ],
      },
      {
        path: "/:profileId/:projectId/build-overview",
        element: <BuildOverview />,
      },
      // {
      //   path: "/:profileId/:projectId/build",
      //   element: <ProtectedRoute user={currentUser} />,
      //   children: [
      //     { index: true, element: <Navigate to="basic" /> },
      //     { path: "basic", element: <BasicPage /> },
      //     { path: "story", element: <StoryPage /> },
      //     { path: "payment", element: <PaymentPage /> },
      //     { path: "preview", element: <PreviewPage /> },
      //   ],
      // },
      { path: "/login", element: <Login />, action: loginAction },
      { path: "/signup", element: <Signup />, action: signupAction },
      {
        path: "/start-project",
        element: <StartProject />,
      },
    ],
  },
]);

export default router;

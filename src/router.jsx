import { Navigate, createBrowserRouter } from "react-router";
import RootLayout from "./routes/layouts/RootLayout.jsx";
import ErrorBoundary from "./routes/ErrorBoundary.jsx";
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Index from "./routes/Index.jsx";
import DiscoverProjects from "./routes/DiscoverProjects.jsx";
import MainLayout from "./routes/layouts/MainLayout.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import Cookies from "js-cookie";

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
          // {
          //   path: "project/details/:projectId",
          //   element: <ProjectDetailsLayout />,
          //   children: [
          //     { index: true, element: <Navigate to="campaign" /> },
          //     { index: "campaign", element: <CampaignPage /> },
          //     { path: "updates", element: <CampaignUpdatesPage /> },
          //     { path: "comments", element: <CommentsPage /> },
          //     { path: "faqs", element: <FaqsPage /> },
          //   ],
          // },
          // {
          //   path: "profile/:profileId",
          //   element: <ProfileLayout user={currentUser} />,
          //   children: [
          //     { index: true, element: <AboutProfile /> },
          //     { path: "backed", element: <BackedProjects /> },
          //     { path: "saved", element: <SavedProjects /> },
          //     { path: "projects", element: <CreatedProjects /> },
          //   ],
          // },
          // {
          //   element: <ProtectedRoute user={currentUser} />,
          //   children: [
          //     {
          //       path: "settings",
          //       element: <SettingsLayout />,
          //       children: [
          //         { index: true, element: <Navigate to="account" /> },
          //         { path: "account", element: <AccountSettings /> },
          //         { path: "profile", element: <ProfileSettings /> },
          //       ],
          //     },
          //   ],
          // },
        ],
      },
      // {
      //   path: "/profile/:profileId/projects/:projectId",
      //   element: <ProtectedRoute user={currentUser} />,
      //   children: [
      //     { path: "build-overview", element: <BuildOverview /> },
      //     {
      //       path: "edit",
      //       element: <BuildProjectLayout />,
      //       children: [
      //         { index: true, element: <Navigate to="basic" /> },
      //         { path: "basic", element: <BasicPage /> },
      //         { path: "story", element: <StoryPage /> },
      //         { path: "payment", element: <PaymentPage /> },
      //         { path: "preview", element: <PreviewPage /> },
      //       ],
      //     },
      //   ],
      // },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/start-project",
        element: (
          <ProtectedRoutes>
            {/* <StartProject /> */}
            <h2>Inside protected route</h2>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default router;

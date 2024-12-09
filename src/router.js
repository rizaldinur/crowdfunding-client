import { Navigate, createBrowserRouter } from "react-router";
import RootLayout from "./routes/layouts/RootLayout.jsx";
import ErrorBoundary from "./routes/ErrorBoundary.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
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
          },
          {
            element: <ProtectedRoute />,
            children: [
              { path: "profile/:profileId" },
              { path: "settings" },
              { path: "start-project" },
            ],
          },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

export default router;

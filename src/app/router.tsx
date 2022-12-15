import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";
import ErrorBoundary from "@/components/ErrorBoundary";

const Inbox = lazy(() => import("@/pages/Inbox"));
const Insights = lazy(() => import("@/pages/Insights"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/inbox" />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "inbox",
        element: <Inbox />,
      },
      {
        path: "insights",
        element: <Insights />,
      },
    ],
  },
]);

export default router;

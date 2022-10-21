import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";
import ErrorBoundary from "@/components/ErrorBoundary";
import Inbox from "@/pages/Inbox";
import Insights from "@/pages/Insights";

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

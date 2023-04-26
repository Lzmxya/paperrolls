import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import App from "@/App";
import ErrorBoundary from "@/components/ErrorBoundary";
import Loading from "@/components/Loading";

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
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <App />
      </QueryParamProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "inbox",
        element: (
          <Suspense fallback={<Loading prompt="正在載入功能" />}>
            <Inbox />
          </Suspense>
        ),
      },
      {
        path: "insights",
        element: (
          <Suspense fallback={<Loading prompt="正在載入功能" />}>
            <Insights />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

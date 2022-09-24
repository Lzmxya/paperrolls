import { createBrowserRouter } from "react-router-dom";

import App from "../App";
// import ErrorBoundary from "../components/ErrorBoundary";
import Inbox from "../pages/Inbox";
import Statistics from "../pages/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Inbox />,
      },
      {
        path: "stats",
        element: <Statistics />,
      },
    ],
  },
]);

export default router;

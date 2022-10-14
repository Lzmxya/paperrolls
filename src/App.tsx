import { Outlet } from "react-router-dom";

import Layout from "./layouts/Layout";

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;

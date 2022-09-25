import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4">
        <h1 className="text-xl">錯誤</h1>
        <h2>
          {error.status}：{error.statusText}
        </h2>
        {error.data?.message && <p>{error.data.message}</p>}
        <Link to="/" className="text-blue-600">
          前往首頁
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>錯誤</p>
    </div>
  );
}

import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen space-y-2 p-4 dark:bg-black dark:text-white">
        <h1 className="text-xl">錯誤</h1>
        <h2>
          {error.status}：{error.statusText}
        </h2>
        {error.data?.message && <p>{error.data.message}</p>}
        <Link to="/" className="text-blue-600 dark:text-blue-400">
          前往首頁
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4">
      <h1 className="text-xl">錯誤</h1>
      <ul className="list-disc space-y-2">
        <li>
          已知本應用程式無法在部分瀏覽器的「私密瀏覽」模式下正確執行，請將之停用後再試一次。
        </li>
        <li>
          若出現本畫面時並未啟用私密瀏覽模式，請至本專案的問題追蹤器回報錯誤。
        </li>
      </ul>
    </div>
  );
}

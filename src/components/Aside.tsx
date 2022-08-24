function Aside() {
  return (
    <aside className="group fixed left-0 h-full w-[4.5rem] bg-blue-50 p-2 transition-all hover:z-10 hover:w-48 hover:shadow-2xl">
      <button className="h-14 min-w-[3.5rem] rounded-2xl bg-blue-300 p-4 hover:shadow-lg">
        +
        <span className="ml-4 hidden whitespace-nowrap group-hover:inline">
          新增發票
        </span>
      </button>
      <nav className="mt-2">
        <ul>
          <li>🗳</li>
          <li>📊</li>
          <li>🗺</li>
        </ul>
      </nav>
    </aside>
  );
}

export default Aside;

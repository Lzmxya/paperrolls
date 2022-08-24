function Header() {
  return (
    <header className="flex h-16 items-center p-2">
      {/* Product name */}
      <div className="flex h-12 min-w-[11.5rem] items-center">
        <div className="h-14 w-14 rounded-full bg-blue-200"></div>
        <h1 className="ml-2 text-2xl">發票</h1>
      </div>
      {/* Search field */}
      <div className="flex-grow">
        <input
          placeholder="在發票中搜尋"
          type="text"
          className="h-12 w-full max-w-[45rem] rounded-lg bg-blue-100 p-4 transition-all focus:bg-white focus:shadow-md focus:outline-none"
        />
      </div>
      {/* Overflow menu */}
      <div></div>
    </header>
  );
}

export default Header;

import { SearchField } from "@/features/search";

function Header() {
  return (
    <header className="flex h-16 items-center p-2">
      {/* Product name */}
      <div className="flex h-12 min-w-[11.5rem] items-center">
        <div className="mx-1 h-14 w-14 rounded-full bg-blue-200"></div>
        <h1 className="ml-2 text-2xl">發票</h1>
      </div>
      {/* Search field */}
      <div className="relative h-12 w-[45rem]">
        <SearchField />
      </div>
      {/* Overflow menu */}
      <div></div>
    </header>
  );
}

export default Header;

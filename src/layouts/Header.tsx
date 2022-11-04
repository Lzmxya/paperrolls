import { SearchField } from "@/features/search";
import { PreferencesMenu } from "@/features/preferences";

function Header() {
  return (
    <header className="flex h-16 items-center justify-between p-2">
      {/* Product name */}
      <div className="flex shrink-0 items-center">
        <div className="mx-1 h-14 w-14 rounded-full bg-blue-200"></div>
        <h1 className="ml-2 text-2xl">發票</h1>
      </div>
      {/* Search field */}
      <div className="relative h-12 w-[45rem]">
        <SearchField />
      </div>
      {/* Overflow menu */}
      <div className="mr-2">
        <PreferencesMenu />
      </div>
    </header>
  );
}

export default Header;

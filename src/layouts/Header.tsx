import { NavLink } from "react-router-dom";
import { useMedia } from "react-use";

import { SearchField } from "@/features/search";
import { PreferencesMenu } from "@/features/preferences";

function Header() {
  const isLargeScreen = useMedia("(min-width: 768px)");

  return (
    <header className="flex h-16 items-center justify-between p-4 md:p-2">
      {isLargeScreen ? (
        <>
          <NavLink to="/" className="flex shrink-0 items-center">
            <div className="mx-1 h-14 w-14 rounded-full bg-blue-200"></div>
            <span className="ml-2 text-2xl">發票</span>
          </NavLink>
          <div className="relative h-12 w-[45rem]">
            <SearchField />
          </div>
          <div className="mr-2">
            <PreferencesMenu />
          </div>
        </>
      ) : (
        <div className="relative h-12 w-[45rem]">
          <SearchField />
        </div>
      )}
    </header>
  );
}

export default Header;

import { NavLink } from "react-router-dom";
// import { useMedia } from "react-use";
import { useAppSelector } from "@/app/hooks";

import { InboxSelectionBar } from "@/features/inbox";
import { PreferencesMenu } from "@/features/preferences";
import { SearchField } from "@/features/search";

function Header() {
  // const isLargeScreen = useMedia("(min-width: 768px)");
  const hasCheckedReceipts =
    useAppSelector((state) => state.inbox.checkedReceipts.length) > 0;

  return (
    <header
      className={`flex h-16 items-center justify-between p-4 transition-all md:p-2 ${
        hasCheckedReceipts && "bg-blue-200 dark:bg-blue-400/50"
      }`}
    >
      {hasCheckedReceipts ? (
        <InboxSelectionBar />
      ) : (
        <>
          <NavLink to="/" title="發票" className="flex shrink-0 items-center">
            <div className="mx-1 h-9 w-9 md:mx-4">
              <img src="/images/launcher-icon.svg" alt="Paperrolls" />
            </div>
            <span className="ml-2 text-2xl">發票</span>
          </NavLink>
          <div className="relative h-12 w-3/5">
            <SearchField />
          </div>
          <div className="mr-2">
            <PreferencesMenu />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;

import { NavLink } from "react-router-dom";
// import { useMedia } from "react-use";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { clearChecked } from "@/features/inbox";
import { SearchField } from "@/features/search";
import { PreferencesMenu } from "@/features/preferences";

import IconButton from "@/components/IconButton";
import { ReactComponent as IconClose } from "@/assets/images/icons/close.svg";

function Header() {
  const dispatch = useAppDispatch();
  // const isLargeScreen = useMedia("(min-width: 768px)");
  const checkedReceiptsLength = useAppSelector(
    (state) => state.inbox.checkedReceipts.length
  );

  return (
    <header
      className={`flex h-16 items-center justify-between p-4 transition-all md:p-2 ${
        checkedReceiptsLength && "bg-blue-200 dark:bg-blue-400/50"
      }`}
    >
      {checkedReceiptsLength ? (
        <>
          <div className="flex items-center gap-6">
            <IconButton
              label="全部取消選取"
              icon={<IconClose />}
              onClick={() => dispatch(clearChecked())}
            />
            <span className="text-xl">
              已選取 {checkedReceiptsLength} 張發票
            </span>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/" className="flex shrink-0 items-center">
            <div className="mx-1 h-14 w-14 rounded-full bg-blue-200"></div>
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

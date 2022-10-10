import { useAppSelector } from "@/app/hooks";
// import { setViewportDate } from "../inboxSlice";

import IconButton from "@/components/IconButton";
import { ReactComponent as ExpandLess } from "@/assets/images/icons/expand-less.svg";
import { ReactComponent as ExpandMore } from "@/assets/images/icons/expand-more.svg";

export function InboxToolbar() {
  const { viewportDate } = useAppSelector((state) => state.inbox);

  return (
    <div className="flex h-14 items-center gap-0.5 border-b border-gray-200 px-2">
      <IconButton label="前一月" icon={<ExpandMore />} onClick={() => null} />
      <button className="select-none rounded-lg p-2 text-xl text-gray-700 hover:bg-gray-100">
        {viewportDate &&
          viewportDate.toLocaleString("default", { month: "short" })}
      </button>
      <IconButton label="後一月" icon={<ExpandLess />} onClick={() => null} />
    </div>
  );
}

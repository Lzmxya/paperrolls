import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setSelected, toggleChecked, setDeleting } from "../inboxSlice";
import { resetToast, setArchivedToast } from "@/features/toast";
import { GroupedVirtuoso, VirtuosoHandle } from "react-virtuoso";
import { format, isThisWeek, isThisYear } from "date-fns";
import { zhTW } from "date-fns/locale";

import { archiveReceipts, IReceipt, ReceiptGroup } from "@/models";
import { InboxButtonStar } from "./InboxButtonStar";
import { SearchHighlighter } from "@/features/search";
import Avatar from "@/components/Avatar";
import IconButton from "@/components/IconButton";
import { ReactComponent as Check } from "@/assets/images/icons/check.svg";
import { ReactComponent as Delete } from "@/assets/images/icons/delete.svg";
import { ReactComponent as Archive } from "@/assets/images/icons/archive.svg";
import { ReactComponent as Unarchive } from "@/assets/images/icons/unarchive.svg";

type PartialReceiptGroup = Partial<ReceiptGroup>;

interface InboxListProps {
  receipts: IReceipt[];
  receiptGroups: PartialReceiptGroup[];
}

const receiptDetailPreviewString = (details: IReceipt["details"]) => {
  const descriptions = details
    .slice(0, 3)
    .map((element) => element.description)
    .join("、");
  return descriptions;
};

export function InboxList({ receipts, receiptGroups }: InboxListProps) {
  const virtuoso = useRef<VirtuosoHandle>(null);
  const dispatch = useAppDispatch();
  const { selectedReceipt, checkedReceipts } = useAppSelector(
    (state) => state.inbox
  );
  const groups = receiptGroups.filter(
    ({ counts, archives }) => counts !== archives
  );
  const counts = groups.map(
    ({ counts, archives }) => (counts || 0) - (archives || 0)
  );

  useEffect(() => {
    if (selectedReceipt.current !== null) {
      virtuoso.current?.scrollIntoView({
        index: selectedReceipt.current,
        behavior: "smooth",
      });
    }
  }, [selectedReceipt]);

  return (
    <div className="isolate grow">
      <GroupedVirtuoso
        ref={virtuoso}
        groupCounts={counts}
        groupContent={(index) => {
          return (
            <div className="relative flex h-14 items-center gap-0.5 border-b border-gray-200 bg-white px-2 transition-all dark:border-transparent dark:bg-neutral-800">
              <button className="rounded-lg p-2 text-xl opacity-80 transition-all hover:bg-black/10 dark:hover:bg-white/25">
                {groups[index].month || "搜尋結果"}
              </button>
            </div>
          );
        }}
        itemContent={(index) => {
          const {
            amount,
            archived,
            details,
            invDate,
            invNum,
            sellerName,
            starred,
          } = receipts[index];

          return (
            <div
              onClick={() =>
                dispatch(
                  setSelected({
                    previous: index - 1,
                    current: index,
                    next: index + 1,
                  })
                )
              }
              className={`group relative flex cursor-pointer border-b border-gray-200 transition-all hover:z-20 hover:shadow-md dark:border-neutral-700 dark:hover:text-white ${
                (selectedReceipt.current === index ||
                  checkedReceipts.includes(invNum)) &&
                "z-10 shadow-md dark:text-white"
              } ${
                checkedReceipts.includes(invNum)
                  ? "bg-blue-200 dark:bg-blue-400/50"
                  : selectedReceipt.current === index
                  ? "bg-blue-100 dark:bg-blue-200/20"
                  : archived
                  ? "bg-black/5 dark:bg-black"
                  : "bg-white dark:bg-neutral-900"
              }
            }`}
            >
              {/* Indicator */}
              {selectedReceipt.current === index && (
                <div className="absolute top-0 left-0 h-full w-1 bg-blue-400"></div>
              )}
              {/* Supporting visuals */}
              <div
                className="h-20 w-20 shrink-0 p-4"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(toggleChecked(invNum));
                }}
              >
                {checkedReceipts.includes(invNum) ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-400">
                    <Check className="fill-current" />
                  </div>
                ) : (
                  <Avatar name={sellerName} />
                )}
              </div>
              {/* Primary text */}
              <div className="m-auto grow overflow-hidden text-sm">
                <p
                  className={`truncate font-bold after:ml-2 ${
                    archived &&
                    "after:rounded after:bg-black/50 after:py-0.5 after:px-1 after:text-xs after:font-normal after:text-white after:content-['封存'] dark:after:bg-white dark:after:text-black"
                  }`}
                >
                  {invNum}
                </p>
                <p className="truncate opacity-80">
                  <SearchHighlighter content={sellerName} />
                </p>
                <p className="truncate opacity-80">
                  <SearchHighlighter
                    content={receiptDetailPreviewString(details)}
                  />
                </p>
              </div>
              {/* Metadata */}
              {/* TODO: FormatJS */}
              <div className="flex flex-col items-end justify-between whitespace-nowrap pl-2">
                <div className="mt-[0.625rem] mr-3">
                  <p className="text-sm">{amount} 元</p>
                </div>
                <div className="flex items-end">
                  <span className="mb-[0.625rem] text-xs  group-hover:invisible">
                    {format(
                      invDate,
                      isThisYear(invDate)
                        ? isThisWeek(invDate)
                          ? "iii"
                          : "MMMdo"
                        : "yyyy/M/d",
                      {
                        locale: zhTW,
                      }
                    )}
                  </span>
                  <ul
                    className={`flex h-10 group-hover:opacity-100 ${
                      !starred && "opacity-60"
                    }`}
                  >
                    <li className="hidden group-hover:list-item">
                      <IconButton
                        label="刪除"
                        icon={<Delete />}
                        onClick={() => dispatch(setDeleting([invNum]))}
                      />
                    </li>
                    <li className="hidden group-hover:list-item">
                      <IconButton
                        label={archived ? "取消封存" : "封存"}
                        icon={archived ? <Unarchive /> : <Archive />}
                        onClick={() => {
                          archiveReceipts([invNum]);
                          dispatch(
                            archived ? resetToast() : setArchivedToast(invNum)
                          );
                        }}
                      />
                    </li>
                    <li>
                      <InboxButtonStar invNum={invNum} starred={starred} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

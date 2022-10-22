import { memo, CSSProperties, MouseEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  InboxState,
  setSelected,
  toggleChecked,
  setViewportDate,
} from "../inboxSlice";
import { setArchivedToast } from "@/features/toast";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { db } from "@/models/db";
import { Receipt } from "@/models/Receipt";

import { SearchHighlighter } from "@/features/search";
import Avatar from "@/components/Avatar";
import IconButton from "@/components/IconButton";
import { ReactComponent as Delete } from "@/assets/images/icons/delete.svg";
import { ReactComponent as Archive } from "@/assets/images/icons/archive.svg";
import { ReactComponent as Star } from "@/assets/images/icons/star.svg";
import { ReactComponent as Starred } from "@/assets/images/icons/starred.svg";

interface InboxListProps {
  data: Receipt[];
}

interface RowProps {
  index: number;
  style: CSSProperties;
  data: Receipt[];
}

const receiptDetailPreviewString = (details: Receipt["details"]) => {
  const descriptions = details
    .slice(0, 3)
    .map((element) => element.description)
    .join("、");
  return descriptions;
};

export function InboxList({ data }: InboxListProps) {
  const listRef = useRef<FixedSizeList>(null);

  const dispatch = useAppDispatch();
  const { selectedReceipt, checkedReceipts, viewportDate } = useAppSelector(
    (state) => state.inbox
  );

  const handleSelect = (
    event: MouseEvent,
    payload: InboxState["selectedReceipt"]
  ) => {
    event.preventDefault();
    dispatch(setSelected(payload));
  };
  const handleCheck = (event: MouseEvent, payload: Receipt["invNum"]) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleChecked(payload));
  };

  const Row = memo(function Row({ index, style }: RowProps) {
    const { amount, archived, details, invDate, invNum, sellerName, starred } =
      data[index];

    return (
      <div
        style={style}
        onClick={(event) =>
          handleSelect(event, {
            previous: index - 1,
            current: index,
            next: index + 1,
          })
        }
        className={`group relative flex border-b border-gray-200 hover:z-20 hover:shadow-md ${
          selectedReceipt.current === index
            ? "z-10 bg-blue-100 shadow-md"
            : archived
            ? "bg-black/5"
            : "bg-white"
        }
        }`}
      >
        {/* Indicator */}
        {selectedReceipt.current === index && (
          <div className="absolute top-0 left-0 h-full w-1 bg-blue-400"></div>
        )}
        {/* Supporting visuals */}
        <div className="h-20 w-20 shrink-0 p-4">
          {/* <div
            className={`h-12 w-12 rounded-full ${
              checkedReceipts.includes(invNum)
                ? "bg-blue-200"
                : "bg-gray-200"
            }`}
            onClick={(event) => handleCheck(event, invNum)}
          ></div> */}
          <Avatar name={sellerName} />
        </div>
        {/* Primary text */}
        <div className="m-auto grow overflow-hidden text-sm">
          <p
            className={`truncate font-bold after:ml-2 ${
              archived &&
              "after:rounded after:bg-black/50 after:py-0.5 after:px-1  after:text-xs after:font-normal after:text-white after:content-['封存']"
            }`}
          >
            {invNum}
          </p>
          <p className="truncate text-gray-700">
            <SearchHighlighter content={sellerName} />
          </p>
          <p className="truncate text-gray-700">
            <SearchHighlighter content={receiptDetailPreviewString(details)} />
          </p>
        </div>
        {/* Metadata */}
        {/* TODO: FormatJS */}
        <div className="flex flex-col items-end justify-between whitespace-nowrap pl-2">
          <div className="mt-[0.625rem] mr-3">
            <p className="text-sm">{amount} 元</p>
          </div>
          <div className="flex items-end">
            <p className="mb-[0.625rem] text-xs  group-hover:invisible">
              {invDate.toLocaleString("default", {
                month: "long",
                day: "numeric",
              })}
            </p>
            <ul className="flex h-10">
              <li className="hidden group-hover:list-item">
                <IconButton
                  label="刪除"
                  icon={<Delete className="opacity-60" />}
                  onClick={() => null}
                />
              </li>
              <li className="hidden group-hover:list-item">
                <IconButton
                  label="封存"
                  icon={<Archive className="opacity-60" />}
                  onClick={() => {
                    db.receipts.update(data[index], {
                      archived: true,
                    });
                    dispatch(setArchivedToast(invNum));
                  }}
                />
              </li>
              <li>
                <IconButton
                  label="加上星號"
                  icon={
                    starred ? (
                      <Starred className="fill-blue-400" />
                    ) : (
                      <Star className="opacity-60" />
                    )
                  }
                  onClick={() => {
                    db.receipts.update(data[index], { starred: !starred });
                  }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }, areEqual);

  useEffect(() => {
    if (selectedReceipt.current !== null) {
      listRef.current?.scrollToItem(selectedReceipt.current);
    }
  }, [selectedReceipt]);

  return (
    <div className="grow cursor-pointer">
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            ref={listRef}
            height={height}
            itemCount={data.length}
            itemSize={80}
            width={width}
            overscanCount={10}
            onItemsRendered={({ visibleStartIndex }) => {
              const startIndexDate = data[visibleStartIndex].invDate;
              if (startIndexDate.getMonth() !== viewportDate?.getMonth()) {
                dispatch(setViewportDate(startIndexDate));
              }
            }}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

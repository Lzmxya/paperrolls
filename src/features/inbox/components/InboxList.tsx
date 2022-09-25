import { CSSProperties, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { InboxState, setSelected, toggleChecked } from "../inboxSlice";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Receipt } from "@/models/Receipt";
import Avatar from "@/components/Avatar";

interface InboxListProps {
  data: Receipt[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
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

export function InboxList({ data, setCurrentMonth }: InboxListProps) {
  const { selectedReceipt, checkedReceipts } = useAppSelector(
    (state) => state.inbox
  );

  const dispatch = useAppDispatch();
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

  const Row = ({ index, style }: RowProps) => (
    <a
      href=""
      onClick={(event) =>
        handleSelect(event, {
          previous: index - 1,
          current: index,
          next: index + 1,
        })
      }
    >
      <div
        style={style}
        className={`relative flex border-b border-gray-200 hover:z-20 hover:shadow-md ${
          selectedReceipt.current === index
            ? "z-10 bg-blue-100 shadow-md"
            : "bg-white"
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
              checkedReceipts.includes(data[index].invNum)
                ? "bg-blue-200"
                : "bg-gray-200"
            }`}
            onClick={(event) => handleCheck(event, data[index].invNum)}
          ></div> */}
          <Avatar name={data[index].sellerName} />
        </div>
        {/* Primary text */}
        <div className="m-auto grow overflow-hidden text-sm">
          <p className="truncate font-bold">{data[index].invNum}</p>
          <p className="truncate text-gray-700">{data[index].sellerName}</p>
          <p className="truncate text-gray-700">
            {receiptDetailPreviewString(data[index].details)}
          </p>
        </div>
        {/* Metadata */}
        {/* TODO: FormatJS */}
        <div className="flex flex-col items-end justify-between whitespace-nowrap py-[0.625rem] pl-2 pr-4">
          <div>
            <p className="text-sm">{data[index].amount} 元</p>
          </div>
          <div>
            <p className="text-xs">{data[index].invDate.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </a>
  );

  return (
    <div className="grow cursor-pointer">
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            height={height}
            itemCount={data.length}
            itemSize={80}
            width={width}
            overscanCount={10}
            onItemsRendered={({ visibleStartIndex }) =>
              setCurrentMonth(data[visibleStartIndex].invDate.getMonth())
            }
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
}

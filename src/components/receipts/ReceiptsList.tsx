import { CSSProperties, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSelected, toggleChecked } from "../../features/inbox/inboxSlice";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Receipt } from "../../models/Receipt";

interface ReceiptsListProps {
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

const ReceiptsList = ({ data, setCurrentMonth }: ReceiptsListProps) => {
  const { currentSelectedReceipt, checkedReceipts } = useAppSelector(
    (state) => state.inbox
  );

  const dispatch = useAppDispatch();
  const handleSelect = (event: MouseEvent, payload: Receipt) => {
    event.preventDefault();
    dispatch(setSelected(payload));
  };
  const handleCheck = (event: MouseEvent, payload: Receipt["invNum"]) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(toggleChecked(payload));
  };

  const Row = ({ index, style }: RowProps) => (
    <a href="" onClick={(event) => handleSelect(event, data[index])}>
      <div
        style={style}
        className="relative flex border-b border-gray-200 hover:shadow-md"
      >
        {/* Indicator */}
        {currentSelectedReceipt?.invNum === data[index].invNum && (
          <div className="absolute top-0 left-0 h-full w-1  bg-blue-400"></div>
        )}
        {/* Supporting visuals */}
        <div className="h-20 w-20 p-4">
          <div
            className={`h-12 w-12 rounded-full ${
              checkedReceipts.includes(data[index].invNum)
                ? "bg-blue-200"
                : "bg-gray-200"
            }`}
            onClick={(event) => handleCheck(event, data[index].invNum)}
          ></div>
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
    <div className="grow">
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
};

export default ReceiptsList;

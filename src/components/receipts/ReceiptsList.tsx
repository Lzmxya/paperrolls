import { CSSProperties } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Receipt } from "../../models/Receipt";

interface ReceiptsListProp {
  data: Receipt[];
}

interface RowProp {
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

const ReceiptsList = ({ data }: ReceiptsListProp) => {
  const Row = ({ index, style }: RowProp) => (
    <a href="">
      <div
        style={style}
        className="flex border-b border-gray-200 hover:shadow-md"
      >
        {/* Supporting visuals */}
        <div className="h-20 w-20 p-4">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
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
    <AutoSizer>
      {({ width, height }) => (
        <FixedSizeList
          height={height}
          itemCount={data.length}
          itemSize={80}
          width={width}
          overscanCount={10}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default ReceiptsList;

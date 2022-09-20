import { memo, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  previousSelected,
  nextSelected,
  clearSelected,
} from "../../features/inbox/inboxSlice";
import { Receipt } from "../../models/Receipt";
import Avatar from "../Avatar";

interface InboxDetailProps {
  data: Receipt[];
}

function InboxDetail({ data }: InboxDetailProps) {
  const index = useAppSelector((state) => state.inbox.selectedReceipt.current);
  const endIndex = data.length - 1;

  const dispatch = useAppDispatch();
  const handlePrevious = () => dispatch(previousSelected());
  const handleNext = () => {
    !(index === endIndex) && dispatch(nextSelected());
  };
  const handleClose = () => dispatch(clearSelected());

  const scrollContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollContainer?.current?.scrollTo(0, 0);
  }, [index]);

  if (!index && index !== 0) {
    return (
      <div className="m-auto">
        <p className="text-xl">尚未選取任何發票</p>
      </div>
    );
  }

  return (
    <div className="flex grow flex-col gap-2">
      {/* Toolbar */}
      <div className="flex h-14 shrink-0 justify-end gap-4 p-6">
        <p className="text-gray-700">
          {index + 1} / {endIndex + 1}
        </p>
        <button onClick={handlePrevious} disabled={index === 0}>
          ⬅
        </button>
        <button onClick={handleNext} disabled={index === endIndex}>
          ➡
        </button>
        <button onClick={handleClose}>❎</button>
      </div>

      <div
        ref={scrollContainer}
        className="flex grow flex-col gap-4 overflow-auto px-6"
      >
        {/* Header */}
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="h-16 w-16">
            <Avatar name={data[index].sellerName} className="text-lg" />
          </div>
          {/* Title */}
          <div className="flex grow flex-col gap-6">
            {/* Title Row1 */}
            <div className="flex justify-between">
              {/* Invoice Number and Seller Name */}
              <div>
                <h2 className="text-2xl">{data[index].invNum}</h2>
                <p>{data[index].sellerName}</p>
              </div>
              {/* Menu */}
              <div>
                {/* <button onClick={handleDelete}>🗑</button> */}
                {/* <button onClick={handleShare}>🗑</button> */}
                {/* <button onClick={handleStar}>🗑</button> */}
              </div>
            </div>
            {/* Title Row2 */}
            <div className="flex justify-between">
              {/* Date */}
              <div className="text-lg">
                <p>{data[index].invDate.toLocaleDateString()}</p>
                <p>{data[index].invDate.toLocaleTimeString()}</p>
              </div>
              {/* Amount */}
              <div className="text-right">
                <p className="mb-1 text-sm">總計</p>
                <p className="text-2xl">
                  {data[index].amount}
                  <span className="ml-1">元</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />

        {/* Details */}
        <table className="mt-[-0.25rem] border-separate border-spacing-y-2">
          <thead>
            <tr className="text-sm">
              <th className="w-[60%] text-left font-normal">品項</th>
              <th className="w-[20%] text-right font-normal">件數</th>
              <th className="w-[20%] text-right font-normal">小計</th>
            </tr>
          </thead>
          <tbody>
            {data[index].details.map((detail, index) => (
              <tr key={index}>
                <td className="text-left">{detail.description}</td>
                <td className="text-right">1</td>
                <td className="text-right">{detail.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />

        {/* Card Type */}
        <div>
          <p className="mb-2 text-sm">載具</p>
          <a
            className="group relative"
            href=""
            title="輕觸即可查看此載具的全部發票"
          >
            {/* Hover Highlight Effect */}
            <div
              className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] rounded-lg transition-all group-hover:bg-gray-100"
              aria-hidden="true"
            ></div>
            {/* Card Info */}
            <div className="relative flex justify-between">
              <div>
                <p>{data[index].cardType}</p>
                <p className="text-sm">{data[index].cardNo}</p>
              </div>
              {/* Card Face */}
              <div className="aspect-[1.6/1] h-11 rounded border border-gray-400 bg-white"></div>
            </div>
          </a>
        </div>
        <hr />

        {/* Seller Info */}
        <div>
          <p className="mb-2 text-sm">賣方</p>
          <p>{data[index].sellerName}</p>
          <p>統一編號：{data[index].sellerBan}</p>
        </div>
        <hr />

        {/* Note */}
        <div>
          <p className="mb-2 text-sm">附註</p>
          {/* <textarea
            name="comment"
            id=""
            placeholder="新增附註"
            className="w-full rounded-lg border border-gray-400 p-2"
          ></textarea> */}
        </div>
      </div>
    </div>
  );
}

export default memo(InboxDetail);
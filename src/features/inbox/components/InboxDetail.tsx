import { memo, useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";
import TextareaAutosize from "react-textarea-autosize";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { previousSelected, nextSelected, clearSelected } from "../inboxSlice";
import { resetToast, setArchivedToast } from "@/features/toast";
import { db } from "@/models/db";
import { IReceipt } from "@/models/Receipt";

import { SearchHighlighter } from "@/features/search";
import Avatar from "@/components/Avatar";
import Divider from "@/components/Divider";
import DropdownMenu from "@/components/DropdownMenu";
import IconButton from "@/components/IconButton";
import { ReactComponent as ChevronLeft } from "@/assets/images/icons/chevron-left.svg";
import { ReactComponent as ChevronRight } from "@/assets/images/icons/chevron-right.svg";
import { ReactComponent as Close } from "@/assets/images/icons/close.svg";
import { ReactComponent as Delete } from "@/assets/images/icons/delete.svg";
import { ReactComponent as Archive } from "@/assets/images/icons/archive.svg";
import { ReactComponent as Star } from "@/assets/images/icons/star.svg";
import { ReactComponent as Starred } from "@/assets/images/icons/starred.svg";
import { ReactComponent as Unarchive } from "@/assets/images/icons/unarchive.svg";

interface InboxDetailProps {
  data: IReceipt[];
}

export const InboxDetail = memo(function InboxDetail({
  data,
}: InboxDetailProps) {
  const dispatch = useAppDispatch();

  const index = useAppSelector((state) => state.inbox.selectedReceipt.current);
  const endIndex = data.length - 1;

  const [receipt, setReceipt] = useState<IReceipt | null>(null);
  const [edited, setEdited] = useState(false);

  const handlePrevious = () => dispatch(previousSelected());
  const handleNext = () => {
    !(index === endIndex) && dispatch(nextSelected());
  };
  const handleClose = () => dispatch(clearSelected());

  const receiptRef = useRef<IReceipt | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const uppermostElementRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(uppermostElementRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    setEdited(false);
    if (index === null) return;
    scrollContainerRef?.current?.scrollTo(0, 0);
    setReceipt(data[index]);
  }, [index, data]);

  useEffect(() => {
    receiptRef.current = receipt;
  }, [receipt]);

  useEffect(() => {
    function handleBeforeunload() {
      if (!edited || !receiptRef.current) return;
      const receipt = receiptRef.current;
      db.receipts.update(receipt.invNum, {
        ...receipt,
        comment: receipt.comment.trim(),
      });
    }
    window.addEventListener("beforeunload", handleBeforeunload);
    return () => {
      handleBeforeunload();
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, [edited]);

  if (receipt && index !== null) {
    const {
      amount,
      archived,
      cardNo,
      cardType,
      comment,
      details,
      invDate,
      invNum,
      sellerBan,
      sellerName,
      starred,
    } = receipt;

    const menuItems = [
      {
        label: archived ? "取消封存" : "封存",
        icon: archived ? <Unarchive /> : <Archive />,
        onClick: () => {
          db.receipts.update(invNum, {
            archived: !archived,
          });
          dispatch(archived ? resetToast() : setArchivedToast(invNum));
        },
      },
      {
        label: "刪除",
        icon: <Delete />,
        onClick: () => null,
      },
    ];

    return (
      <div className="flex h-full grow flex-col break-all">
        {/* Toolbar */}
        <div
          className={`flex h-14 shrink-0 items-center justify-end px-2 transition-all md:bg-white md:dark:bg-neutral-800 ${
            intersection &&
            intersection.intersectionRatio < 1 &&
            "bg-blue-100 dark:bg-neutral-700"
          }`}
        >
          <span className="mx-2 opacity-80">
            {index + 1} / {endIndex + 1}
          </span>
          <IconButton
            label="上一張"
            icon={<ChevronLeft />}
            onClick={handlePrevious}
            disabled={index === 0}
          />
          <IconButton
            label="下一張"
            icon={<ChevronRight />}
            onClick={handleNext}
            disabled={index === endIndex}
          />
          <IconButton label="關閉" icon={<Close />} onClick={handleClose} />
        </div>

        <div
          ref={scrollContainerRef}
          className="flex grow flex-col gap-4 overflow-auto px-6 pt-2"
        >
          {/* Header */}
          <div ref={uppermostElementRef} className="flex gap-6">
            {/* Avatar */}
            <div className="h-16 w-16 shrink-0">
              <Avatar name={sellerName} className="text-lg" />
            </div>
            {/* Title */}
            <div className="flex grow select-text flex-col gap-6">
              {/* Title Row1 */}
              <div className="flex justify-between">
                {/* Invoice Number and Seller Name */}
                <div>
                  <h2 className="text-2xl">{invNum}</h2>
                  <p>
                    <SearchHighlighter content={sellerName} />
                  </p>
                </div>
                {/* Menu */}
                <div className="flex items-center">
                  <IconButton
                    label={starred ? "移除星號" : "加上星號"}
                    icon={
                      starred ? <Starred className="fill-blue-400" /> : <Star />
                    }
                    onClick={() =>
                      db.receipts.update(invNum, { starred: !starred })
                    }
                  />
                  <DropdownMenu items={menuItems} icons />
                </div>
              </div>
              {/* Title Row2 */}
              <div className="flex justify-between">
                {/* Date */}
                <div className="text-lg">
                  <p>{invDate.toLocaleDateString()}</p>
                  <p>{invDate.toLocaleTimeString()}</p>
                </div>
                {/* Amount */}
                <div className="text-right">
                  <p className="mb-1 text-sm">總計</p>
                  <p className="text-2xl">
                    {amount}
                    <span className="ml-1">元</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Divider />

          {/* Details */}
          <table className="-mt-1 border-separate border-spacing-y-2">
            <thead>
              <tr className="text-sm">
                <th className="w-3/5 text-left font-normal">品項</th>
                <th className="w-1/5 text-right font-normal">件數</th>
                <th className="w-1/5 text-right font-normal">小計</th>
              </tr>
            </thead>
            <tbody className="select-text">
              {details.map((detail, index) => (
                <tr key={index}>
                  <td className="text-left">
                    <SearchHighlighter content={detail.description} />
                  </td>
                  <td className="text-right">1</td>
                  <td className="text-right">{detail.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Divider />

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
                className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] rounded-lg transition-all group-hover:bg-black/10 dark:group-hover:bg-white/25"
                aria-hidden="true"
              ></div>
              {/* Card Info */}
              <div className="relative flex justify-between">
                <div>
                  <p>{cardType}</p>
                  <p className="text-sm">{cardNo}</p>
                </div>
                {/* Card Face */}
                <div className="aspect-[1.6/1] h-11 rounded border border-gray-400 bg-white"></div>
              </div>
            </a>
          </div>
          <Divider />

          {/* Seller Info */}
          <div>
            <p className="mb-2 text-sm">賣方</p>
            <p>{sellerName}</p>
            <p>統一編號：{sellerBan}</p>
          </div>
          <Divider />

          {/* Note */}
          <div>
            <p className="mb-2 text-sm">附註</p>
            <TextareaAutosize
              placeholder="新增附註"
              value={comment}
              onChange={(event) => {
                setEdited(true);
                setReceipt(
                  (prev) => prev && { ...prev, comment: event.target.value }
                );
              }}
              minRows={2}
              className="mb-4 w-full resize-none bg-transparent outline-none"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto">
      <p className="text-xl">尚未選取任何發票</p>
    </div>
  );
});

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../../models/db";
import ReceiptsList from "./ReceiptsList";

interface ReceiptsListTitleProp {
  currentMonth: number;
}

const ReceiptsListTitle = ({ currentMonth }: ReceiptsListTitleProp) => (
  <div className="flex h-14 border-b border-gray-200">
    <div className="m-4 flex gap-2">
      <div>🔽</div>
      <div className="text-xl text-gray-700">{currentMonth + 1} 月</div>
      <div>🔼</div>
    </div>
  </div>
);

function ReceiptsInbox() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const receipts = useLiveQuery(() =>
    db.receipts.orderBy("invDate").reverse().toArray()
  );

  if (!receipts) {
    return (
      // TODO: skeleton loading
      <div className="flex grow flex-col self-center text-center">
        <h2 className="m-2 text-xl">正在載入…</h2>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="flex grow flex-col self-center text-center">
        <h2 className="m-2 text-xl">沒有發票</h2>
        <p className="text-gray-500">
          將由財政部寄送的「消費資訊」郵件中的 .csv
          附件拖曳至此，或輕觸左側選單的「＋新增發票」按鈕以匯入發票。
        </p>
      </div>
    );
  }

  return (
    <div className="flex grow">
      <div className="flex min-w-[15rem] grow flex-col">
        <ReceiptsListTitle currentMonth={currentMonth} />
        <ReceiptsList data={receipts} setCurrentMonth={setCurrentMonth} />
      </div>
      <div className="min-w-[28rem] grow"></div>
    </div>
  );
}

export default ReceiptsInbox;

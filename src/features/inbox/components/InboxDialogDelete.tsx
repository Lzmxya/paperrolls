import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearDeleting } from "../inboxSlice";

import { db } from "@/models";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";

export function InboxDialogDelete() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogHeadline, setDialogHeadline] = useState("");

  const dispatch = useAppDispatch();
  const invNum = useAppSelector((state) => state.inbox.deletingReceipt);

  useEffect(() => {
    if (!invNum) return;
    setDialogHeadline(`刪除「${invNum}」？`);
    setDialogIsOpen(true);
  }, [invNum]);

  return (
    <Dialog
      isOpen={dialogIsOpen}
      setIsOpen={setDialogIsOpen}
      headline={dialogHeadline}
      content="這項操作無法復原。"
      dismiss={
        <Button
          label="取消"
          onClick={() => {
            setDialogIsOpen(false);
            dispatch(clearDeleting());
          }}
        />
      }
      confirm={
        <Button
          label="刪除"
          onClick={() => {
            if (!invNum) return;
            setDialogIsOpen(false);
            dispatch(clearDeleting());
            db.receipts.delete(invNum);
          }}
        />
      }
    />
  );
}

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearChecked, clearDeleting, toggleChecked } from "../inboxSlice";

import { db } from "@/models";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";

export function InboxDialogDelete() {
  const dispatch = useAppDispatch();
  const { checkedReceipts, deletingReceipts } = useAppSelector(
    (state) => state.inbox
  );
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogHeadline, setDialogHeadline] = useState("");
  const handleDelete = () => {
    setDialogIsOpen(false);
    db.receipts.bulkDelete(deletingReceipts);
    if (deletingReceipts.length > 1) {
      dispatch(clearChecked());
      dispatch(clearDeleting());
      return;
    }
    if (checkedReceipts.includes(deletingReceipts[0])) {
      dispatch(toggleChecked(deletingReceipts[0]));
      dispatch(clearDeleting());
      return;
    }
    dispatch(clearDeleting());
  };

  useEffect(() => {
    if (deletingReceipts.length === 0) return;
    if (deletingReceipts.length === 1) {
      setDialogHeadline(`刪除「${deletingReceipts[0]}」？`);
    } else {
      setDialogHeadline("刪除多張發票？");
    }
    setDialogIsOpen(true);
  }, [deletingReceipts]);

  return (
    <Dialog
      isOpen={dialogIsOpen}
      setIsOpen={setDialogIsOpen}
      headline={dialogHeadline}
      content="這項操作無法復原。"
      dismiss={<Button label="取消" onClick={() => setDialogIsOpen(false)} />}
      confirm={<Button label="刪除" onClick={handleDelete} />}
    />
  );
}

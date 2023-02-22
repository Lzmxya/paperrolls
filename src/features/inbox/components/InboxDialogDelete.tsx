import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearChecked, clearDeleting, toggleChecked } from "../inboxSlice";

import { deleteReceipts } from "@/models";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";

export function InboxDialogDelete() {
  const dispatch = useAppDispatch();
  const { checkedReceipts, deletingReceipts: deletingReceiptIds } =
    useAppSelector((state) => state.inbox);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogHeadline, setDialogHeadline] = useState("");
  const handleDelete = () => {
    setDialogIsOpen(false);
    deleteReceipts(deletingReceiptIds);
    if (deletingReceiptIds.length > 1) {
      dispatch(clearChecked());
      dispatch(clearDeleting());
      return;
    }
    if (checkedReceipts.includes(deletingReceiptIds[0])) {
      dispatch(toggleChecked(deletingReceiptIds[0]));
      dispatch(clearDeleting());
      return;
    }
    dispatch(clearDeleting());
  };

  useEffect(() => {
    if (deletingReceiptIds.length === 0) return;
    if (deletingReceiptIds.length === 1) {
      setDialogHeadline(`刪除「${deletingReceiptIds[0]}」？`);
    } else {
      setDialogHeadline("刪除多張發票？");
    }
    setDialogIsOpen(true);
  }, [deletingReceiptIds]);

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

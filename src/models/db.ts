import Dexie, { Table } from "dexie";
import { format } from "date-fns";

import { Receipt } from "./Receipt";
import { ReceiptGroup } from "./ReceiptGroup";

export class ReceiptsDB extends Dexie {
  receipts!: Table<Receipt, string>;
  receiptGroups!: Table<ReceiptGroup, string>;
  constructor() {
    super("ReceiptsDB");
    this.version(1).stores({
      receipts: "invNum, invDate, amount, cardType",
      receiptGroups: "month",
    });
    this.receipts.mapToClass(Receipt);
  }
}

export const db = new ReceiptsDB();

export function archiveReceipts(receiptIds: Receipt["invNum"][]) {
  return db.transaction("rw", db.receipts, db.receiptGroups, async () => {
    const archivingReceipts = await db.receipts.bulkGet(receiptIds);
    // If receipts are all archived, unarchive them all, otherwise archive them all.
    const areAllArchived = archivingReceipts.every(
      (archivingReceipt) => archivingReceipt?.archived
    );
    archivingReceipts.forEach((archivingReceipt) => {
      if (!archivingReceipt) return;
      const receiptId = archivingReceipt.invNum;
      const groupMonth = format(archivingReceipt.invDate, "yyyy-MM");
      if (areAllArchived) {
        // Unarchive them all
        db.receipts.update(receiptId, { archived: false });
        db.receiptGroups.where({ month: groupMonth }).modify((receiptGroup) => {
          receiptGroup.archives -= 1;
        });
        return;
      }
      if (archivingReceipts.length === 1) {
        // Archive single receipt
        db.receipts.update(receiptId, { archived: true });
        db.receiptGroups.where({ month: groupMonth }).modify((receiptGroup) => {
          receiptGroup.archives += 1;
        });
        return;
      }
      if (archivingReceipt.archived) {
        // When archiving them all, skip the one already archived.
        return;
      }
      db.receipts.update(receiptId, { archived: true });
      db.receiptGroups.where({ month: groupMonth }).modify((receiptGroup) => {
        receiptGroup.archives += 1;
      });
    });
  });
}

export function deleteReceipts(deletingReceiptIds: Receipt["invNum"][]) {
  return db.transaction("rw", db.receipts, db.receiptGroups, async () => {
    const deletingReceipts = await db.receipts.bulkGet(deletingReceiptIds);
    deletingReceipts.forEach((deletingReceipt) => {
      if (!deletingReceipt) return;
      db.receiptGroups
        .where({ month: format(deletingReceipt.invDate, "yyyy-MM") })
        .modify((receiptGroup, ref: { value?: ReceiptGroup }) => {
          if (receiptGroup.counts > 1) {
            receiptGroup.counts -= 1;
            receiptGroup.total -= deletingReceipt.amount;
            return;
          }
          delete ref.value;
        });
    });
    db.receipts.bulkDelete(deletingReceiptIds);
  });
}

export function resetDatabase() {
  return db.transaction("rw", db.receipts, db.receiptGroups, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}

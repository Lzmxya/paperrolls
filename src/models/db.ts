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

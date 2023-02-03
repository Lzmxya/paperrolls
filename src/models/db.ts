import Dexie, { Table } from "dexie";

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

export function resetDatabase() {
  return db.transaction("rw", db.receipts, db.receiptGroups, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}

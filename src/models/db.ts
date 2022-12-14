import Dexie, { Table } from "dexie";

import { Receipt } from "./Receipt";

export class ReceiptsDB extends Dexie {
  receipts!: Table<Receipt, string>;
  constructor() {
    super("ReceiptsDB");
    this.version(1).stores({
      receipts: "invNum, invDate, amount, cardType",
    });
    this.receipts.mapToClass(Receipt);
  }
}

export const db = new ReceiptsDB();

export function resetDatabase() {
  return db.transaction("rw", db.receipts, async () => {
    await Promise.all(db.tables.map((table) => table.clear()));
  });
}

import { db } from "@/models";

export const toastActions = new Map([
  [
    "ARCHIVE",
    {
      label: "復原",
      callback: (target: string) =>
        db.receipts.where({ invNum: target }).modify({ archived: false }),
    },
  ],
  ["DELETE", { label: "復原", callback: () => null }],
]);

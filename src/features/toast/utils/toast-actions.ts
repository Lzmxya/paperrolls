import { archiveReceipts } from "@/models";

export const toastActions = new Map([
  [
    "ARCHIVE",
    {
      label: "復原",
      callback: (target: string) => archiveReceipts([target]),
    },
  ],
  ["DELETE", { label: "復原", callback: () => null }],
]);

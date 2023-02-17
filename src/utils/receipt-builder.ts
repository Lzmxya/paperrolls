import Papa, { ParseResult } from "papaparse";
import { FileWithPath } from "file-selector";
import { format } from "date-fns";

import { db, Receipt, ReceiptGroup } from "@/models";

const parseCsv = (csv: string) => {
  const result: ParseResult<string[]> = Papa.parse(csv, {
    delimiter: "|",
    newline: "\n",
  });

  if (result.errors.length != 0) {
    console.error(result.errors);
    return;
  }

  return result.data;
};

const organizeReceipts = async (file: FileWithPath) => {
  const binaryString = await file.text();
  const parsedResult = parseCsv(binaryString);
  const receipts = parsedResult?.slice(2).reduce((a: Receipt[], x) => {
    switch (x[0]) {
      case "M":
        {
          a.push(new Receipt(x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8]));
        }
        break;

      case "D":
        {
          a[a.length - 1].addDetail(+x[2], x[3]);
        }
        break;

      default:
        break;
    }

    return a;
  }, []);

  return receipts;
};

const organizeGroups = (receipts: Receipt[]) => {
  const groups = receipts
    .map(
      ({ amount, invDate, archived }): ReceiptGroup => ({
        month: format(invDate, "yyyy-MM"),
        total: amount,
        counts: 1,
        archives: archived ? 1 : 0,
      })
    )
    .reduce((accumulator: ReceiptGroup[], current) => {
      const sameMonthIndex = accumulator.findIndex(
        (element) => element.month === current.month
      );

      if (sameMonthIndex === -1) {
        accumulator.push(current);
      } else {
        accumulator[sameMonthIndex] = {
          ...accumulator[sameMonthIndex],
          total: accumulator[sameMonthIndex].total + current.total,
          archives: accumulator[sameMonthIndex].archives + current.archives,
          counts: ++accumulator[sameMonthIndex].counts,
        };
      }

      return accumulator;
    }, []);

  return groups;
};

export const importReceipts = async (acceptedFiles: FileWithPath[]) => {
  let bulkReceipts: Receipt[] = [];
  for (const file of acceptedFiles) {
    const receipts = await organizeReceipts(file);
    if (!receipts) {
      // TODO
      continue;
    }
    bulkReceipts = bulkReceipts.concat(receipts);
  }

  db.transaction("rw", db.receipts, db.receiptGroups, async () => {
    db.receipts.bulkPut(bulkReceipts);
    const bulkGroups = await db.receipts.toArray((result) =>
      organizeGroups(result)
    );
    db.receiptGroups.bulkPut(bulkGroups);
  });
};

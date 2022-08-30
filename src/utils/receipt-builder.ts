import Papa, { ParseResult } from "papaparse";
import { FileWithPath } from "file-selector";

import { db } from "../models/db";
import { Receipt } from "../models/Receipt";

type ResultDataRows = {
  [index in 0]: string;
};

const parseCsv = (csv: string) => {
  const result: ParseResult<ResultDataRows> = Papa.parse(csv, {
    delimiter: "|",
    newline: "\n",
    // dynamicTyping: true,
  });

  if (result.errors.length != 0) {
    console.error(result.errors);
    return;
  }

  return result.data;
};

const organizeReceipts = async (file: FileWithPath) => {
  const binaryStr = await file.text();
  const parsedResult = parseCsv(binaryStr);
  if (!parsedResult) {
    // TODO
    return;
  }
  const deHeaderResult = parsedResult.slice(2);
  const receipts = deHeaderResult.reduce((a: Receipt[], x) => {
    switch (x[0]) {
      case "M":
        {
          let y: unknown[] = [];
          y = y.concat(x).slice(1);
          a.push(
            new Receipt(
              ...(y as [
                string,
                string,
                string,
                number,
                string,
                string,
                number,
                string
              ])
            )
          );
          // const y = x.slice(1);
          // a.push(new Receipt(...x.slice(1)));
        }
        break;

      case "D":
        {
          let y: unknown[] = [];
          y = y.concat(x).slice(2);
          a[a.length - 1].addDetail(...(y as [number, string]));
          // const y = x.slice(2);
          // a[a.length - 1].addDetail(...(y as [number, string]));
        }
        break;

      default:
        break;
    }

    return a;
  }, []);

  return receipts;
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
  db.receipts.bulkPut(bulkReceipts);
};

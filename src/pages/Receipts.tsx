import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";

import { importReceipts } from "../utils";
import ReceiptsInbox from "../components/receipts/ReceiptsInbox";

function Receipts() {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    importReceipts(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  return (
    <main
      {...getRootProps()}
      className={
        "ml-[4.5rem] mb-2 mr-2 flex w-full overflow-hidden rounded-xl bg-white " +
        (isDragActive && "border-2 border-blue-400")
      }
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="grow self-center text-center">
          <p className="text-gray-500">
            將由財政部寄送的「消費資訊」郵件中的 .csv 附件拖曳至此即可匯入發票。
          </p>
        </div>
      ) : (
        <ReceiptsInbox />
      )}
    </main>
  );
}

export default Receipts;

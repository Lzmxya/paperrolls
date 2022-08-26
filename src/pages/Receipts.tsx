import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import ReceiptsEmpty from "../components/receipts/ReceiptsEmpty";

function Receipts() {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  return (
    <main
      {...getRootProps()}
      className={
        "ml-[4.5rem] mb-2 mr-2 flex w-full rounded-xl bg-white " +
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
        <ReceiptsEmpty />
      )}
    </main>
  );
}

export default Receipts;

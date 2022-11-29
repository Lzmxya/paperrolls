import { ReactNode, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setPickerIsOpen } from "../uploaderSlice";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import { importReceipts } from "@/utils";

interface UploaderProps {
  children: ReactNode;
}

export function Uploader({ children }: UploaderProps) {
  const dispatch = useAppDispatch();
  const { pickerIsOpen } = useAppSelector((state) => state.uploader);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    importReceipts(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    noClick: true,
    noKeyboard: true,
    onDrop,
  });

  useEffect(() => {
    if (!pickerIsOpen) return;
    open();
    dispatch(setPickerIsOpen(false));
  }, [dispatch, open, pickerIsOpen]);

  return (
    <div {...getRootProps()} className="relative flex grow">
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-xl border-2 border-blue-400 bg-blue-100 dark:bg-neutral-900">
          <div>
            <h2 className="text-xl">將檔案拖放至此</h2>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

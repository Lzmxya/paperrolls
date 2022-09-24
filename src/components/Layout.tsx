import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";

import { importReceipts } from "../utils";

import Header from "./Header";
import Aside from "./Aside";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
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
    <div className="flex h-screen flex-col bg-blue-50">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Aside />
        <main
          {...getRootProps()}
          className="relative mb-2 mr-2 flex grow overflow-hidden rounded-xl bg-white"
        >
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-xl border-2 border-blue-400 bg-blue-100">
              <div>
                <p className="text-gray-500">
                  將由財政部寄送的「消費資訊」郵件中的 .csv
                  附件拖曳至此即可匯入發票。
                </p>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

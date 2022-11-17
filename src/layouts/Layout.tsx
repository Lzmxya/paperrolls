import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileWithPath } from "file-selector";
import * as ToastPrimitive from "@radix-ui/react-toast";

import { importReceipts } from "@/utils";

import Header from "./Header";
import Navigation from "./Navigation";
import { Toast } from "@/features/toast";

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
    <div className="flex h-screen select-none flex-col bg-blue-50 transition-all dark:bg-neutral-900 dark:text-neutral-300">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Navigation />
        <main
          {...getRootProps()}
          className="relative mb-20 flex grow overflow-hidden bg-white outline outline-white transition-all dark:bg-neutral-800 dark:outline-neutral-800 md:mb-2 md:mr-2 md:rounded-xl"
        >
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-xl border-2 border-blue-400 bg-blue-100 dark:bg-neutral-900">
              <div>
                <p className="text-gray-500">
                  將由財政部寄送的「消費資訊」郵件中的 .csv
                  附件拖曳至此即可匯入發票。
                </p>
              </div>
            </div>
          )}
          {children}
          <ToastPrimitive.ToastProvider>
            <Toast />
            <ToastPrimitive.Viewport />
          </ToastPrimitive.ToastProvider>
        </main>
      </div>
    </div>
  );
}

export default Layout;

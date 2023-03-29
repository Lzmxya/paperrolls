import { ReactNode, Suspense } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

import Header from "./Header";
import Navigation from "./Navigation";
import { Toast } from "@/features/toast";
import { Uploader } from "@/features/uploader";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen select-none flex-col bg-blue-50 transition-all dark:bg-neutral-900 dark:text-neutral-300">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Navigation />
        <main className="mb-20 flex grow overflow-hidden border-white bg-white transition-all dark:border-neutral-800 dark:bg-neutral-800 md:mb-2 md:mr-2 md:rounded-xl md:border">
          <Uploader>
            <Suspense>{children}</Suspense>
            <ToastPrimitive.ToastProvider>
              <Toast />
              <ToastPrimitive.Viewport />
            </ToastPrimitive.ToastProvider>
          </Uploader>
        </main>
      </div>
    </div>
  );
}

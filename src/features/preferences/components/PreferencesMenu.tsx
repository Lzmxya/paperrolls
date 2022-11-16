import { useState } from "react";
import { Popover } from "@headlessui/react";

import { resetDatabase } from "@/models/db";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Divider from "@/components/Divider";
import { ThemeOptions } from "./ThemeOptions";

import { ReactComponent as DeleteForever } from "@/assets/images/icons/delete-forever.svg";

export function PreferencesMenu() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Popover className="flex">
      <Popover.Button
        aria-label="開啟帳戶選單"
        className="h-10 w-10 overflow-hidden rounded-full p-1 transition-all hover:bg-black/10 focus:bg-black/10 focus:outline-none dark:hover:bg-white/25 dark:focus:bg-white/25"
      >
        <div className="h-full w-full rounded-full bg-blue-200"></div>
      </Popover.Button>

      <Popover.Panel className="fixed right-4 left-4 top-16 z-30 flex flex-col gap-2 rounded-lg bg-blue-100 py-2 shadow-md dark:bg-neutral-700 md:right-4 md:left-auto md:top-14 md:rounded">
        <div>
          <div className="flex h-12 items-center hover:bg-blue-200 dark:hover:bg-blue-200/20">
            <ThemeOptions />
          </div>
          <Popover.Button
            onClick={() => setDialogIsOpen(true)}
            className="flex h-12 w-full items-center px-3 hover:bg-blue-200 dark:hover:bg-blue-200/20"
          >
            清除所有資料
          </Popover.Button>
        </div>
        <Divider />
        <div>
          <Popover.Button
            as="a"
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-full items-center px-3 hover:bg-blue-200 dark:hover:bg-blue-200/20"
          >
            在 GitHub 上檢視本專案
          </Popover.Button>
        </div>
      </Popover.Panel>
      <Dialog
        icon={<DeleteForever />}
        headline="清除所有資料？"
        content="這將會刪除所有你儲存於本應用程式的發票（包含星號標記、附註等內容）與偏好設定。此動作無法復原。"
        dismiss={<Button label="取消" onClick={() => setDialogIsOpen(false)} />}
        confirm={
          <Button
            label="清除"
            onClick={() => {
              resetDatabase();
              setDialogIsOpen(false);
            }}
          />
        }
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </Popover>
  );
}

import { ReactNode } from "react";
import { Popover } from "@headlessui/react";

import { ChipFilterProps } from "./ChipFilter";
import { ReactComponent as IconCheck } from "@/assets/images/icons/check.svg";

interface ChipFilterMenuProps extends Partial<ChipFilterProps> {
  children: ReactNode;
}

export default function ChipFilterMenu({
  children,
  isOn,
  label,
}: ChipFilterMenuProps) {
  return (
    <Popover className="relative flex">
      <Popover.Button aria-label="開啟帳戶選單" as="div">
        <button
          className={`flex h-8 items-center overflow-hidden rounded-lg border px-2 ${
            isOn
              ? "border-transparent bg-blue-200 hover:bg-blue-300 dark:border-transparent dark:bg-blue-400/50 dark:hover:bg-blue-300/50"
              : "border-black/10 hover:bg-black/10 dark:border-white/25 dark:hover:bg-white/25"
          }`}
        >
          <IconCheck
            className={`fill-current transition-all ${isOn ? "w-6" : "w-0"}`}
          />
          <span className="px-2">{label}</span>
        </button>
      </Popover.Button>

      <Popover.Panel className="absolute z-40 mt-9 flex flex-col gap-2 rounded-lg bg-blue-100 py-2 shadow-md ring-1 ring-black/5 dark:bg-neutral-700 dark:ring-white/25">
        <div>{children}</div>
      </Popover.Panel>
    </Popover>
  );
}

import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

import { ReactComponent as IconCheck } from "@/assets/images/icons/check.svg";

export interface ChipFilterProps {
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ChipFilter({
  isOn,
  setIsOn,
  label,
  onClick,
}: ChipFilterProps) {
  return (
    <TogglePrimitive.Root
      defaultPressed={isOn}
      onPressedChange={setIsOn}
      asChild
    >
      <button
        onClick={onClick}
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
    </TogglePrimitive.Root>
  );
}

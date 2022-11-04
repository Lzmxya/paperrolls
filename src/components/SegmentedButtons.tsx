import { ReactNode } from "react";
import { RadioGroup } from "@headlessui/react";

interface SegmentedButtonsProps {
  options: { icon: ReactNode; name: string; title: string }[];
}

export default function SegmentedButtons({ options }: SegmentedButtonsProps) {
  return (
    <div className="flex h-10 items-center divide-x divide-gray-500 overflow-hidden rounded-full border border-gray-500 dark:divide-gray-300 dark:border-gray-300">
      {options.map((option) => (
        <RadioGroup.Option
          key={option.name}
          value={option.name}
          title={option.title}
          className="cursor-pointer fill-current p-3 transition-all hover:bg-blue-300/60 ui-checked:bg-blue-300/80"
        >
          {option.icon}
        </RadioGroup.Option>
      ))}
    </div>
  );
}

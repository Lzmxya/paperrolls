import { Fragment, MouseEventHandler, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";

import { ReactComponent as IconMore } from "@/assets/images/icons/more-vert.svg";

interface DropdownMenuProps {
  icons?: boolean;
  items: {
    icon?: ReactNode;
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }[];
}

export default function DropdownMenu({ icons, items }: DropdownMenuProps) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button
          title="更多選項"
          className="flex h-10 w-10 items-center justify-center rounded-full fill-current stroke-current stroke-0 transition-all hover:bg-black/10 hover:stroke-[0.6px] active:bg-black/20 dark:hover:bg-white/25 dark:active:bg-white/40"
        >
          <IconMore />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-fit min-w-[12rem] origin-top-right rounded bg-blue-100 py-2 shadow-md ring-1 ring-black/5 focus:outline-none dark:bg-neutral-700">
          {items.map(({ icon, label, onClick }, index) => (
            <Menu.Item
              as="button"
              key={index}
              onClick={onClick}
              className="flex h-12 w-full items-center gap-3 px-3 hover:bg-blue-200 ui-active:bg-blue-200 dark:hover:bg-blue-200/20 dark:ui-active:bg-blue-200/20"
            >
              {icons && <div className="w-6 fill-current">{icon}</div>}
              <div className="whitespace-nowrap">{label}</div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

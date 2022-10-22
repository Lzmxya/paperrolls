import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetToast, toastActions } from "@/features/toast";

import * as ToastPrimitive from "@radix-ui/react-toast";

export function Toast() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { description, target, type } = useAppSelector((state) => state.toast);

  const radixClassNames =
    "radix-state-open:animate-toast-slide-in-bottom translate-x-radix-toast-swipe-move-x";

  useEffect(() => {
    if (!description) {
      setOpen(false);
      return;
    }

    if (open) {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 400);
    } else {
      setOpen(true);
    }
  }, [description]);

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={setOpen}
      className={`absolute inset-x-0 bottom-6 z-50 mx-6 flex h-12 items-center justify-between rounded-lg bg-black pr-2 pl-4 text-white md:mx-auto md:w-80 ${radixClassNames}`}
    >
      <ToastPrimitive.Description>{description}</ToastPrimitive.Description>
      {type && toastActions.has(type) && (
        <ToastPrimitive.Action
          altText={toastActions.get(type)?.label || ""}
          asChild
        >
          <button
            onClick={() => {
              toastActions.get(type)?.callback(target);
              dispatch(resetToast());
            }}
            className="p-2 font-semibold text-blue-300"
          >
            {toastActions.get(type)?.label}
          </button>
        </ToastPrimitive.Action>
      )}
    </ToastPrimitive.Root>
  );
}

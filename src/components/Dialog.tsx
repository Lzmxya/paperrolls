import { Dispatch, Fragment, ReactElement } from "react";
import { Dialog as Modal, Transition } from "@headlessui/react";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  icon?: ReactElement;
  headline: string;
  content: string;
  confirm: ReactElement;
  dismiss?: ReactElement;
}

export default function Dialog({
  isOpen,
  setIsOpen,
  icon,
  headline,
  content,
  confirm,
  dismiss,
}: DialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Modal
        as="div"
        className="relative z-10 select-none dark:text-neutral-300"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Modal.Panel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-700">
                {icon && (
                  <div className="mb-4 flex justify-center fill-current">
                    {icon}
                  </div>
                )}
                <Modal.Title
                  as="h3"
                  className="text-center text-lg font-medium leading-6"
                >
                  {headline}
                </Modal.Title>
                <div className="mt-4">
                  <p className="text-sm opacity-80">{content}</p>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  {dismiss}
                  {confirm}
                </div>
              </Modal.Panel>
            </Transition.Child>
          </div>
        </div>
      </Modal>
    </Transition>
  );
}

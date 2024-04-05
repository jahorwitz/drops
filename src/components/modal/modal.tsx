import { ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import exitButton from "../../images/exit-modal-button-min.svg";
import { ButtonIcon } from "../button/button";

// Types for modal props
type modalProps = {
  title?: string;
  children?: ReactNode;
};

export const Modal = ({ title, children }: modalProps) => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Transition show={isOpen} appear={true}>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <Transition.Child
          appear={true}
          enter="transition-opacity linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="transition-opacity linear duration-300"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>
        <Transition.Child
          appear={true}
          enter="transition transform duration-300"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition transform duration-300"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        ></Transition.Child>
        <Dialog.Panel className="bg-white fixed left-0 bottom-0 w-full rounded-t-[20px] px-4 pt-5 pb-7">
          <div className="flex justify-between z-10">
            <Dialog.Title className="font-text text-section-subtext font-medium pb-8">
              {title}
            </Dialog.Title>
            <ButtonIcon
              onClick={() => setIsOpen(false)}
              icon={exitButton}
              className="outline-none"
            />
          </div>
          <div className="flex justify-center w-full">{children}</div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

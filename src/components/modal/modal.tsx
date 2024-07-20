import { ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../button/button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type modalProps = {
  title?: string;
  buttonText?: string;
  children?: ReactNode;
};

export const Modal = ({ title, children, buttonText }: modalProps) => {
  const [isOpen, setIsOpen] = useState(true);

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
        <Dialog.Panel className="bg-white fixed flex flex-col  min-h-[578px] left-0 bottom-0 w-full rounded-t-[20px] px-4 pt-5 pb-7">
          <div className="flex justify-between z-10">
            <Dialog.Title className="font-text text-section-subtext font-medium pb-8">
              {title}
            </Dialog.Title>
            <Button
              variant="icon"
              onClick={() => setIsOpen(false)}
              icon={faX as IconDefinition}
              className="outline-none"
              />
          </div>
          <div className="flex flex-col w-full">{children}</div>
          <Button
            variant="primary"
            className="mt-auto"
            buttonText={buttonText}
          />
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};


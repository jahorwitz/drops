import { MouseEventHandler, ReactNode, useState, createContext, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../button/button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import useModal from "./useModalHook";

/* Modal Context */
type ModalContextType = {
  currentModal: string;
  openModal: (modalId: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  currentModal: "",
  openModal: () => { },
  closeModal: () => { },
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [currentModal, setCurrentModal] = useState("");

  const openModal = (modalId: string) => {
    setCurrentModal(modalId);

  };

  const closeModal = () => {
    setCurrentModal("");
  };

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

/* Modal Component */
type modalProps = {
  modalId: string;
  title?: string;
  buttonText?: string;
  children?: ReactNode;
  onSubmit?: MouseEventHandler
  isOpen?: boolean
  onClose?: () => void
};

export const Modal = ({ title, modalId, children, buttonText, onSubmit }: modalProps) => {
  const { currentModal, closeModal } = useModal();

  return (
    <Transition show={currentModal === modalId} appear={true}>
      <Dialog open={currentModal === modalId} onClose={closeModal}>
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
        <Dialog.Panel className="bg-white fixed flex flex-col min-h-[60vh] left-0 bottom-0 w-full rounded-t-[20px] px-4 pt-5 pb-7">
          <div className="flex justify-between z-10">
            <Dialog.Title className="font-text text-section-subtext font-medium pb-8">
              {title}
            </Dialog.Title>
            <Button
              variant="icon"
              onClick={closeModal}
              icon={faX as IconDefinition}
              className="outline-none"
            />
          </div>
          <div className="flex flex-col w-full">{children}</div>
          <Button
            variant="primary"
            type="submit"
            className="mt-auto"
            buttonText={buttonText}
            onClick={onSubmit}
          />
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

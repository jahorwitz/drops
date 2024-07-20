import { useState, ReactNode } from "react";
import { ModalContext } from "./modalContext";


type ModalProviderType = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState("");

  const openModal = (modalId: string) => {
    setCurrentModal(modalId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentModal("");
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, currentModal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

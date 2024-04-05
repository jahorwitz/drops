import { createContext, useContext, useState, PropsWithChildren } from "react";

// Define modal context types

type ModalContextType = {
  isOpen: boolean;
  currentModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

// useModal hook

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

// Define Modal Provider

export const ModalProvider = ({ children }: PropsWithChildren<{}>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState("");

    const openModal = (modalId: string) => {
      setCurrentModal(modalId);
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setCurrentModal("");
      setIsOpen(false);
    }
  
    return (
      <ModalContext.Provider value={{isOpen, currentModal, openModal, closeModal}}>
      {children}
      </ModalContext.Provider>
    )
  };


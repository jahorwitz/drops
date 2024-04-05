import { createContext, useContext } from "react";

// Define modal context types

type ModalContextType = {
  isOpen: boolean;
  currentModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

// useModal hook

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

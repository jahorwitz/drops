import { useContext } from "react";
import { ModalContext } from "./ModalContext";

// useModal hook

export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

import { useContext } from "react";
import { ModalContext } from "./modalContext";


export const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};
import { ModalContext } from "./modal";
import { useContext } from "react";

/* useContext Hook */
const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

export default useModal;

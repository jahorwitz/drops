import { Modal } from "./modal";
import { ButtonPrimary } from "../button/button";

export default {
  title: "Modal",
  component: Modal,
};

export const ModalStory = () => {
  return (
    <Modal title="Add Glucose Measurement">
      <ButtonPrimary buttonText="Add Measurement" />
    </Modal>
  );
};

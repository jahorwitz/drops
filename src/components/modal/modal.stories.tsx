import { Modal } from "./modal";

export default {
  title: "Modal",
  component: Modal,
};

export const ModalStory = () => {
  return (
    <Modal title="Add Glucose Measurement" buttonText="Add Measurement"></Modal>
  );
};

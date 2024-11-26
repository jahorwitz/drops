import { Button } from "../button";
import { Modal, ModalProvider } from "./modal";
import { useForm } from "react-hook-form";
import useModal from "./useModalHook";

export default {
  title: "Modal",
  component: Modal,
};

interface MyFormValues {
  myTextField: string;
  anotherTextField: string;
  anEnumField: "one" | "two" | "three";
}

export const Default = () => {
  const { handleSubmit } = useForm<MyFormValues>();
  const onSubmit = (data: MyFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const ModalTrigger = () => {
    const { openModal } = useModal();
    return (
      <Button
        variant="secondary"
        buttonText="Open Modal"
        onClick={() => openModal("glucose-measurement")}
      />
    );
  };

  return (
    <ModalProvider>
      <div>
        <ModalTrigger />
        <Modal
          modalId="glucose-measurement"
          title="Add Glucose Measurement"
          buttonText="Add Measurement"
          onSubmit={handleSubmit(onSubmit)}
        >
          This is a modal
        </Modal>
      </div>
    </ModalProvider>
  );
};

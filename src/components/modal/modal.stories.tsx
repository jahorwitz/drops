import { Modal } from "./modal";
import { useForm } from "react-hook-form";

export default {
  title: "Modal",
  component: Modal,
};

interface MyFormValues {
  myTextField: string;
  anotherTextField: string;
  anEnumField: "one" | "two" | "three";
}


export const ModalStory = () => {

  const {
    handleSubmit,
  } = useForm<MyFormValues>();
  const onSubmit = (data: MyFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Modal title="Add Glucose Measurement" buttonText="Add Measurement" onSubmit={handleSubmit(onSubmit)}>

    </Modal>
  );
};


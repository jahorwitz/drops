import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "../../../components";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface Props {
  index?: number;
  onDelete?: (index: number) => void;
  elementId?: number;
}

export const MedicationSection: React.FC<Props> = ({
  index,
  onDelete,
  elementId,
}) => {
  const inputName = `medication${elementId}`;

  type TextInputValue = Record<typeof inputName, string>;

  const {
    register,
    unregister,
    formState: { errors },
  } = useForm<TextInputValue>();

  return (
    <div className="flex flex-col gap-5 bg-white mx-auto min-w-[315px] max-w-[400px] px-4 py-3 w-full rounded-[16px]">
      <div className="flex items-centerw">
        <h3 className="font-text text-section-subtext font-medium leading-[24px] text-center text-2xl">
          Medication {index}
        </h3>
        <Button
          variant="icon"
          icon={faTrashCan}
          className="ml-auto"
          onClick={() => {
            if (onDelete && elementId) {
              onDelete(elementId);
              unregister(inputName);
            }
          }}
        />
      </div>
      <Form.TextInput
        labelText="Medication name & amount"
        placeholder="Medication name & amount"
        type="text"
        feedback={errors[inputName]?.message}
        {...register(inputName, {
          required: "This field is required",
        })}
      />
      <Form.AddMoreSection buttonText="+ Add more reminders">
        <Form.ListTimeInput
          label="Reminder"
          parentIndex={index}
          errors={errors}
        />
      </Form.AddMoreSection>
    </div>
  );
};

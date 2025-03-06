import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "../../components";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import closeIcon from "../../images/Close-Icon.png";
import { ListTimeInput } from "./list-time-input";

interface MedicationFormValues {
  medicationInfo: string;
  time?: string;
}

interface Props {
  index?: number;
  onDelete?: (index: number) => void;
  elementId?: number;
  title: string;
  isModal?: boolean;
  medication?: {
    name: string;
    amount: number;
    unitOfMeasure: string;
    time?: string;
  };
  buttonText?: string;
  onClose?: () => void;
  onSubmit?: (data: MedicationFormValues) => void;
  label: string;
}

export const MedicationForm: React.FC<Props> = ({
  index,
  onDelete,
  elementId,
  title,
  isModal = false,
  medication,
  buttonText = "Save",
  onClose,
  onSubmit,
  label,
}) => {
  const {
    register,
    handleSubmit,
    unregister,
    control,
    formState: { errors },
  } = useForm<MedicationFormValues>({
    defaultValues: {
      medicationInfo: medication
        ? `${medication.name} ${medication.amount}${medication.unitOfMeasure}`
        : "",
      time: medication?.time || "",
    },
  });

  return (
    <form
      onSubmit={onSubmit ? handleSubmit(onSubmit) : (e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-5 bg-white mx-auto min-w-[315px] max-w-[400px] px-4 py-3 w-full h-full rounded-[16px]">
        <div className="flex items-center">
          <h3 className="font-text text-section-subtext font-medium leading-[24px] text-center text-2xl">
            {title}
          </h3>
          {!isModal ? (
            <Button
              variant="icon"
              icon={faTrashCan}
              className="ml-auto"
              onClick={() => {
                if (onDelete && elementId) {
                  onDelete(elementId);
                  unregister("medicationInfo");
                }
              }}
            />
          ) : (
            <button className="ml-auto" type="button" onClick={onClose}>
              <img src={closeIcon} alt="Close" className="w-full h-full" />
            </button>
          )}
        </div>
        <Form.TextInput
          labelText={label}
          placeholder="e.g., Ibuprofen 800mg"
          type="text"
          defaultValue={
            medication
              ? `${medication.name} ${medication.amount}${medication.unitOfMeasure}`
              : ""
          }
          feedback={errors.medicationInfo?.message}
          {...register("medicationInfo", {
            required: "This field is required",
          })}
        />
        <Form.AddMoreSection buttonText="+ Add more reminders">
          <Form.ListTimeInput
            label="Reminder"
            parentIndex={index}
            onDelete={onDelete}
            elementId={elementId}
            control={control}
            errors={errors}
            fieldName="time"
          />
        </Form.AddMoreSection>
        
        {isModal && (
          <Button
            variant="primary"
            type="submit"
            buttonText={buttonText}
            className="gap-5 w-[340px] h-[60px] absolute bottom-6 rounded-3xl"
          />
        )}
      </div>
    </form>
  );
};

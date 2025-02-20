import React from "react";
import { Controller, Control, FieldErrors, useForm } from "react-hook-form";
import { Form, Button } from "..";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface Props {
  index?: number;
  onDelete?: (index: number) => void;
  elementId?: number;
  label: string;
  varient2Text?: string;
  parentIndex?: number;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  fieldName?: string;
}

export const ListTimeInput: React.FC<Props> = ({
  index,
  onDelete,
  elementId,
  label,
  varient2Text,
  parentIndex,
}) => {
  const inputName = `reminder${parentIndex}-${index}`;

  type TimePickerValue = Record<typeof inputName, string>;

  const {
    control,
    register,
    unregister,
    formState: { errors },
  } = useForm<TimePickerValue>();

  return (
    <div className="relative">
      <Controller
        name={inputName}
        control={control}
        render={({ field }) => (
          <>
            <Form.TimePicker
              {...field}
              {...register(inputName, {
                required: "Time value is required",
                pattern: {
                  value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                  message: "Invalid time format. Please use hh:mm:AM/PM",
                },
              })}
              labelText={
                varient2Text
                  ? `${varient2Text} ${index} ${label}`
                  : `${label} ${index}`
              }
              setValue={(name, value) =>
                field.onChange({ target: { name, value } })
              }
              feedback={errors[inputName]?.message}
            />
          </>
        )}
      />
      <Button
        variant="icon"
        icon={faTrashCan}
        className="absolute bottom-[22px] right-5"
        onClick={() => {
          if (onDelete && elementId) {
            onDelete(elementId);
            unregister(inputName);
          }
        }}
      />
    </div>
  );
};

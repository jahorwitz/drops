import React from "react";
import { Controller } from "react-hook-form";
import { Form, Button } from "..";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface Props {
  index?: number;
  onDelete?: (index: number) => void;
  elementId?: number;
  label: string;
  varient2Text?: string;
  parentIndex?: number;
  control: any;
  errors: any;
  fieldName?: string;
}

export const ListTimeInput: React.FC<Props> = ({
  index,
  onDelete,
  elementId,
  label,
  varient2Text,
  parentIndex,
  control,
  errors,
  fieldName,
}) => {
  const inputName = fieldName || `reminder${parentIndex}-${index}`;

  return (
    <div className="relative">
      <Controller
        name={inputName}
        control={control}
        rules={{
          required: "Time value is required",
          pattern: {
            value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
            message: "Invalid time format. Please use hh:mm:AM/PM",
          },
        }}
        render={({ field }) => (
          <Form.TimePicker
            {...field}
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
        )}
      />
      <Button
        variant="icon"
        icon={faTrashCan}
        className="absolute bottom-[22px] right-5"
        onClick={() => {
          if (onDelete && elementId) {
            onDelete(elementId);
          }
        }}
      />
    </div>
  );
};

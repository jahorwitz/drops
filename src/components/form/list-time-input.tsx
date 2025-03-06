import React, {forwardRef} from "react";
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { Form, Button } from "..";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface Props<TFieldValues extends FieldValues = FieldValues> {
  index?: number;
  onDelete?: (index: number) => void;
  elementId?: number;
  label: string;
  varient2Text?: string;
  parentIndex?: number;
  control?: Control<TFieldValues>;
  errors?: FieldErrors<TFieldValues>;
  fieldName?: string;
}

export const ListTimeInput = forwardRef<
  HTMLDivElement,
  Props<FieldValues>
>(function ListTimeInput(
  {
    index,
    onDelete,
    elementId,
    label,
    varient2Text,
    parentIndex,
    control,
    errors,
    fieldName,
  },
  ref
) {
  const inputName = fieldName || `reminder${parentIndex}-${index}`;

  return (
    <div className="relative" ref={ref}>
      <Controller
        name={inputName as Path<FieldValues>}
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
            feedback={
              errors &&
              inputName in errors &&
              typeof errors[inputName]?.message === "string"
                ? errors[inputName]?.message
                : undefined
            }
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
});

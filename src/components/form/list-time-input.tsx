import React, { forwardRef } from "react";
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

// This is a type-safe wrapper that preserves the generic type parameter
export function ListTimeInput<TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues> & { ref?: React.Ref<HTMLDivElement> }
) {
  const {
    index,
    onDelete,
    elementId,
    label,
    varient2Text,
    parentIndex,
    control,
    errors,
    fieldName,
    ref,
  } = props;

  const inputName = fieldName || `reminder${parentIndex}-${index}`;

  return (
    <div className="relative" ref={ref}>
      <Controller
        name={inputName as Path<TFieldValues>}
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
}

// For backward compatibility with existing code that uses forwardRef
export const ForwardedListTimeInput = forwardRef(
  function ForwardedListTimeInput(
    props: Props<FieldValues>,
    ref: React.Ref<HTMLDivElement>
  ) {
    return <ListTimeInput {...props} ref={ref} />;
  }
);

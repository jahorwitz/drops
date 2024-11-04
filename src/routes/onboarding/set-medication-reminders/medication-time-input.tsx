import React from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Form } from "../../../components";

interface Props {
  index?: number;
  onDelete?: (index:number) => void;
  elementId?: number;
}

export const MedicationTimeInput: React.FC<Props> = ({ index, onDelete, elementId}) => {
  const {
    control,
    register,
    unregister,
    formState: {errors},
  } = useForm();

  const inputName = `reminder${elementId}` || "reminder6"

  return (
    <div>
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
                      message: "Invalid time format. Please use hh:mm:AM/PM"
                    }
                  })}
                  labelText={`Reminder ${index}`}
                  hintText="Choose a time"
                  setValue={(name, value) => field.onChange({ target: { name, value } })}
                  feedback={errors.inputName?.message as string | undefined}
                  delete={() => {
                    if (onDelete && elementId) {
                      onDelete(elementId);
                      unregister(inputName);
                    }
                  }}
                />
                
              </>
            )}
          />
        </div>
  )
}
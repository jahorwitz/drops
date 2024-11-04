import React from "react";
import { Controller } from "react-hook-form";
import { Form } from "../../../components";

export const MedicationTimeInput: React.FC = ({ control, register, index, errors }) => {
  return (
    <div>
            <Controller
            name="reminder1"
            control={control}
            render={({ field }) => (
              <>
                <Form.TimePicker
                  {...field}
                  {...register("reminder1", {
                    required: "Time value is required",
                    pattern: {
                      value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                      message: "Invalid time format. Please use hh:mm:AM/PM"
                    }
                  })}
                  labelText={`Reminder ${index}`}
                  hintText="Choose a time"
                  setValue={(name, value) => field.onChange({ target: { name, value } })}
                  feedback={errors.reminder1?.message}
                />
                
              </>
            )}
          />
        </div>
  )
}
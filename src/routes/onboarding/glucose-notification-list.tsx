import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from "../../components/form/form";

export const GlucoseNotificationList: React.FC = () => {
  interface TimePicker {
    timeValue: string;
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimePicker>();

  const onSubmit = (data: TimePicker) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="timeValue"
        control={control}
        render={({ field }) => {
          console.log(field);

          return (
            <Form.TimePicker
              {...field}
              {...register("timeValue", {
                required: "Time value is required",
                pattern: {
                  value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                  message: "Invalid time format. Please use hh:mm:AM/PM",
                },
              })}
              labelText="Reminder 1"
              hintText="Choose a time"
              setValue={(name, value) =>
                field.onChange({ target: { name, value } })
              }
              feedback={errors.timeValue?.message}
            />
          );
        }}
      />
    </Form>
  );
};

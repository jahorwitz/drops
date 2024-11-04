import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../../components/form/form";
import { Button } from "../../components/button";

export const GlucoseNotificationList: React.FC = () => {
  const [reminders, setReminders] = useState<string[]>([uuidv4()]);

  const {
    control,
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { [key: string]: string }) => {
    alert(JSON.stringify(Object.values(data), null, 2));
  };

  const addReminder = (id: string) => {
    setReminders((prevState) => [...prevState, id]);
  };

  const removeReminder = (reminder: { [key: number]: string }) => {
    setReminders((prevState) => {
      return prevState.filter((item) => item != reminder);
    });
  };

  return (
    <div className="flex flex-col bg-[#FFCCD4] max-w-screen-md pb-8 px-[10px] relative overflow-hidden m-auto h-screen">
      <div className="bg-white mx-auto min-w-[315px] max-w-[400px] px-4 py-3 w-full rounded-[16px]">
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {reminders.map((reminder) => {
            const reminderIndex = reminders.indexOf(reminder) + 1;

            return (
              <div key={reminder}>
                <p>{`Reminder ${reminderIndex}`} </p>
                <div className="flex items-center">
                  <Controller
                    name={reminder}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Form.TimePicker
                          {...field}
                          {...register(reminder, {
                            required: "Time value is required",
                            pattern: {
                              value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                              message:
                                "Invalid time format. Please use hh:mm:AM/PM",
                            },
                          })}
                          setValue={(name, value) =>
                            field.onChange({ target: { name, value } })
                          }
                          feedback={errors[reminder]?.message as string}
                          delete={() => {
                            unregister(reminder);
                            removeReminder(reminder);
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            variant="text"
            buttonText="+ Add more"
            className="my-5 p-0"
            onClick={() => addReminder(uuidv4())}
          ></Button>
          <Button type="submit" variant="primary" buttonText="Submit"></Button>
        </Form>
      </div>
    </div>
  );
};

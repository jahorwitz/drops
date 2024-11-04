import React, { useState } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
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
    <div className="flex flex-col bg-black max-w-screen-md pb-8 relative overflow-hidden m-auto h-screen">
      <div className="bg-white mx-auto px-4 py-3 rounded-lg">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {reminders.map((reminder) => {
            const reminderIndex = reminders.indexOf(reminder) + 1;

            return (
              <div className="flex" key={reminder}>
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
                        labelText={`Reminder ${reminderIndex}`}
                        setValue={(name, value) =>
                          field.onChange({ target: { name, value } })
                        }
                        feedback={errors[reminder]?.message as string}
                      />
                    );
                  }}
                />
                <Button
                  type="button"
                  variant="icon"
                  buttonText=""
                  icon={faTrashCan}
                  onClick={() => {
                    unregister(reminder);
                    removeReminder(reminder);
                  }}
                ></Button>
              </div>
            );
          })}
          <Button type="submit" variant="primary" buttonText="Submit"></Button>
          <Button
            type="button"
            variant="text"
            buttonText="+ Add more"
            onClick={() => addReminder(uuidv4())}
          ></Button>
        </Form>
      </div>
    </div>
  );
};

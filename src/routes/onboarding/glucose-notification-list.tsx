import React, { useState } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../../components/form/form";
import { Button } from "../../components/button";

export const GlucoseNotificationList: React.FC = () => {
  const [reminders, setReminders] = useState<Array<{ [key: string]: string }>>([
    { "123": "00:00:AM" },
  ]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: { [key: string]: string }) => {
    alert(JSON.stringify(data, null, 2));
  };

  const addReminder = (id: string) => {
    setReminders((prevState) => [...prevState, { [id]: "00:00:AM" }]);
  };

  const removeReminder = (reminder: { [key: number]: string }) => {
    setReminders(reminders.filter((item) => item != reminder));
  };

  return (
    <div className="flex flex-col bg-black max-w-screen-md pb-8 relative overflow-hidden m-auto h-screen">
      <div className="bg-white mx-auto px-4 py-3 rounded-lg">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {reminders.map((reminder) => {
            const reminderKey = reminders.indexOf(reminder);
            const reminderName = `reminder${reminderKey}`;

            return (
              <div className="flex" key={Object.keys(reminder)[0]}>
                <Controller
                  name={reminderName}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Form.TimePicker
                        {...field}
                        {...register(reminderName, {
                          required: "Time value is required",
                          pattern: {
                            value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                            message:
                              "Invalid time format. Please use hh:mm:AM/PM",
                          },
                        })}
                        labelText={`Reminder ${reminderKey}`}
                        setValue={(name, value) =>
                          field.onChange({ target: { name, value } })
                        }
                        feedback={errors[reminderName]?.message as string}
                      />
                    );
                  }}
                />
                <Button
                  type="button"
                  variant="icon"
                  buttonText=""
                  icon={faTrashCan}
                  onClick={() => removeReminder(reminder)}
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

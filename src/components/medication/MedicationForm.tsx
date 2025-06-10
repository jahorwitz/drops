import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "../../components";
import ExitIcon from "../../images/Close-Icon.png";
import { useMutation } from "@apollo/client";
import { CREATE_REMINDER, UPDATE_REMINDER } from "../../graphql/mutations/reminders";
import { TimePicker } from "../form/time-picker";

// MedicationFormFields will use array for time values
type MedicationFormFields = {
  label: string;
  timeValues: string[]; // Store multiple reminder times 
};

interface Props {
  toggleForm: () => void;
  defaultValues?: { label?: string; timeValues?: string[] };
  title?: string;
  editingId?: string;
}

export const MedicationForm: React.FC<Props> = ({
  toggleForm,
  defaultValues,
  title = "New medication",
  editingId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<MedicationFormFields>({
    defaultValues: {
      label: defaultValues?.label || "",
      timeValues: defaultValues?.timeValues || [""],
    },
    mode: "onChange",
  });

  // manage all times
  const [timeValues, setTimeValues] = useState<string[]>(
    defaultValues?.timeValues && defaultValues?.timeValues.length > 0
      ? defaultValues.timeValues
      : [""]
  );

  const [createReminder] = useMutation(CREATE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

  const [updateReminder] = useMutation(UPDATE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

  // Add a new time entry
  const addTime = () => setTimeValues((prev) => [...prev, ""]);

  // Update a time at a specific index
  const updateTime = (idx: number, value: string) =>
    setTimeValues((prev) =>
      prev.map((t, i) => (i === idx ? value : t))
    );

  // On submit, join times with comma and save
  const onSubmit = async (formData: MedicationFormFields) => {
    const timeString = timeValues.filter(Boolean).join(", ");
    const variables = {
      data: {
        label: formData.label,
        time: timeString,
        type: "medication",
      },
    };

    try {
      if (editingId) {
        await updateReminder({ variables: { ...variables, where: { id: editingId } } });
      } else {
        await createReminder({ variables });
      }
      toggleForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`${editingId ? "Update" : "Create"} reminder failed:`, err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-2xl px-4 pt-5 pb-6 shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold font-text">{title}</h2>
          <div className="flex gap-3">
            <img
              src={ExitIcon}
              alt="Close"
              className="cursor-pointer w-5 h-5"
              onClick={toggleForm}
            />
          </div>
        </div>

        <Form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Form.TextInput
            labelText="Name & dosage"
            placeholder="Type name & dosage"
            {...register("label", { required: "Label is required" })}
            feedback={errors.label?.message}
          />

          {/* Render a TimePicker for each time in timeValues */}
          {timeValues.map((val, idx) => {
            // Split time into hour, minute, period
            const [hourMinute, period = "AM"] = val.split(" ");
            const [hour = "", minute = ""] = (hourMinute || "").split(":");

            return (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <TimePicker
                  labelText={idx === 0 ? "Reminder Time" : undefined}
                  hour={hour}
                  minute={minute}
                  period={period}
                  // Only care about value, don't use field name
                  setValue={(_field, value) => updateTime(idx, value as string)}
                />
              </div>
            );
          })}

          <Button
            type="button"
            buttonText="+ Add more reminders"
            onClick={addTime}
            variant="text"
            className="pb-[166px]"
          />

          <Button
            type="submit"
            buttonText="Save"
            variant="primary"
            disabled={!isValid}
            className="w-full h-12 rounded-xl bg-black text-white mt-4"
          />
        </Form>
      </div>
    </div>
  );
};

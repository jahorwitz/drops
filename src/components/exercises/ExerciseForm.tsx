import { useForm } from "react-hook-form";
import { Button, Form } from "../../components";
import { CREATE_REMINDER } from "../../graphql/mutations/reminders";
import ExitIcon from "../../images/Close-Icon.png";
import TrashIcon from "../../images/trashicon.png";
import { useMutation } from "@apollo/client";
import { TimePicker } from "../form/time-picker";
import { WeekdaySelector } from "../form/weekday";

interface Props {
  toggleForm: () => void;
  defaultValues?: {
    label: string;
    time: string;
    duration?: string;
    days?: string[];
    reminderOffset?: string;
  };
  title?: string;
  onDelete?: () => void;
}

export type ExerciseFormFields = {
  label: string;
  timeValue: string;
  duration: string;
  days: string[];
  reminderOffset: string;
};


export const ExerciseForm: React.FC<Props> = ({
  toggleForm,
  defaultValues,
  title = "Editing exercise",
  onDelete,
}) => {
  // react-hook-form with default values and validation on change
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ExerciseFormFields>({
    defaultValues: {
      label: defaultValues?.label || "",
      timeValue: defaultValues?.time || "",
      duration: defaultValues?.duration || "",
      days: defaultValues?.days || [],
      reminderOffset: defaultValues?.reminderOffset || "",
    },
    mode: "onChange",
  });

  const [createReminder] = useMutation(CREATE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

  // Transform the form fields into GraphQL compatible format and submit
  const onSubmit = async (formData: ExerciseFormFields) => {
    const data = {
      label: formData.label,
      time: formData.timeValue,
      type: "exercise",
      days: formData.days.join(","), 
      duration: formData.duration, 
      reminderOffset: formData.reminderOffset, 
    };

    try {
      await createReminder({ variables: { data } });
      toggleForm();
    } catch (err) {
      console.error("Create exercise failed:", (err as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-2xl px-4 pt-5 pb-6 shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold font-text">{title}</h2>
          <div className="flex gap-3">
            {onDelete && (
              <img
                src={TrashIcon}
                alt="Delete"
                className="cursor-pointer w-5 h-5"
                onClick={onDelete}
              />
            )}
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
            labelText="Name"
            placeholder="Walking"
            {...register("label", { required: "Label is required" })}
            feedback={errors.label?.message}
          />

          <WeekdaySelector
            labelText="Days to exercise"
            {...register("days")}
          />

         <TimePicker
  labelText="Time"
            setValue={setValue}
/>

          <Form.TextInput
            labelText="Duration (min)"
            placeholder="1h"
            {...register("duration")}
          />

          <Form.TextInput
            labelText="Reminder"
            placeholder="1h before"
            {...register("reminderOffset")}
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

import { useForm } from "react-hook-form";
import { Button, Form } from "../../components";
import ExitIcon from "../../images/Close-Icon.png";
import TrashIcon from "../../images/trashicon.png";
import { useMutation } from "@apollo/client";
import { CREATE_REMINDER } from "../../graphql/mutations/reminders";

interface Props {
  toggleForm: () => void;
  defaultValues?: { time: string; label: string };
  title?: string;
  onDelete?: () => void;
  onAddMore?: () => void;
}

type ReminderFormFields = {
  label: string;
  time: string;
  hour: string;
  minute: string;
  period: string;
};

// React form for creating a reminder with separate hour/minute/period inputs.


export const ReminderForm: React.FC<Props> = ({
  toggleForm,
  defaultValues,
  title = "Editing reminder",
  onDelete,
  onAddMore,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<ReminderFormFields>({
    defaultValues: {
      label: defaultValues?.label || "",
      time: defaultValues?.time || "",
      hour: "",
      minute: "",
      period: "AM",
    },
    mode: "onChange",
  });

  const [createReminder] = useMutation(CREATE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

   // Combined hour/minute/period into one time string to match backend format

  const handleTimeChange = () => {
    const hour = getValues("hour");
    const minute = getValues("minute");
    const period = getValues("period");
    setValue("time", `${hour}:${minute} ${period}`);
  };

  const onSubmit = async (formData: ReminderFormFields) => {
    try {
      const time = `${formData.hour}:${formData.minute} ${formData.period}`;
      const data = { label: formData.label, time };
      const res = await createReminder({ variables: { data } });
      console.log("Reminder created:", res);
      toggleForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Create reminder failed:", err.message);
      }
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
{/* Reminder time input split into hour, minute, and AM/PM */}
        <Form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Form.TextInput
            labelText="Name"
            placeholder="Meal 1"
            {...register("label", { required: "Label is required" })}
            feedback={errors.label?.message}
          />

          <div>
            <p className="text-sm text-gray-500 font-text mb-2">Reminder 1</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="00"
                {...register("hour", { required: true })}
                maxLength={2}
                className="w-[60px] h-[60px] text-center border rounded-[8px] font-medium"
                onChange={handleTimeChange}
              />
              <span>:</span>
              <input
                type="text"
                placeholder="00"
                {...register("minute", { required: true })}
                maxLength={2}
                className="w-[60px] h-[60px] text-center border rounded-[8px] font-medium"
                onChange={handleTimeChange}
              />
              <select
                {...register("period", { required: true })}
                className="w-[60px] h-[60px] text-center border rounded-[8px] font-medium"
                onChange={handleTimeChange}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div className="text-center pb-[166px]">
            {onAddMore && (
              <button
                type="button"
                className="text-blue-600 font-medium text-[18px] mt-2"
                style={{ color: "rgba(18, 18, 18, 0.6)" }}
                onClick={onAddMore}
              >
                + Add more reminders
              </button>
            )}
          </div>

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

import { useForm } from "react-hook-form";
import { Button, Form } from "../../components";
import ExitIcon from "../../images/Close-Icon.png";
import TrashIcon from "../../images/trashicon.png";
import { useMutation } from "@apollo/client";
import { CREATE_REMINDER } from "../../graphql/mutations/reminders";
import { TimePicker } from "../form/time-picker";
import { AddMoreSection } from "../form/add-more-section";

interface Props {
  toggleForm: () => void;
  defaultValues?: { time: string; label: string };
  title?: string;
  onDelete?: () => void;
}

type ReminderFormFields = {
  label: string;
  timeValue: string;
};

// form for creating a reminder with separate hour/minute/period inputs.


export const ReminderForm: React.FC<Props> = ({
  toggleForm,
  defaultValues,
  title = "Editing reminder",
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<ReminderFormFields>({
    defaultValues: {
      label: defaultValues?.label || "",
      timeValue: defaultValues?.time || "",
    },
    mode: "onChange",
  });

  // Create a new reminder via GraphQL mutation

  const [createReminder] = useMutation(CREATE_REMINDER, {
    refetchQueries: ["GetReminders"],  // refetch list after mutation
  });

  const onSubmit = async (formData: ReminderFormFields) => {
    try {
      const data = { label: formData.label, time: formData.timeValue };
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

        <Form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <Form.TextInput
            labelText="Name"
            placeholder="Meal 1"
            {...register("label", { required: "Label is required" })}
            feedback={errors.label?.message}
          />

         
<AddMoreSection buttonText="+ Add more reminders" className="mt-2 pb-[166px]">
    <TimePicker
      labelText="Reminder Time"
      setValue={setValue as unknown as (field: string, value: unknown) => void}
    />
</AddMoreSection>

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

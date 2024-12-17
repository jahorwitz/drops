import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import useModal from "../../../components/modal/useModalHook";

const medications = [
  {
    title: "Insulin",
    times: ["12:00 PM", "6:00 PM"],
  },
  {
    title: "Vitamins",
    times: ["9:30 AM"],
  },
];

interface MyFormValues {
  nameAndDosage: string;
  medicationTime: string;
}

export const ProfileMedications: React.FC = () => {
  const { openModal } = useModal();

  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm<MyFormValues>();
  const onSubmit = (data: MyFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="rounded-2xl bg-white p-3 mx-[10px] my-3 text-center">
      <h4 className="font-text text-section-subtext font-medium pb-4 text-left">
        Medication
      </h4>
      {medications.map((medication, i) => {
        return (
          <div className="flex pb-4 justify-between text-left" key={i}>
            <div>
              <p className="font-text">{medication.title}</p>
              <p className="font-text text-paragraph-sm text-[rgba(18,18,18,0.6)] leading-4">
                {medication.times.join(", ")}
              </p>
            </div>
            <div>
              <Button
                variant="icon"
                icon={faPencil}
                onClick={() => {
                  openModal("profile-medications-edit");
                }}
              />
              <Button variant="icon" icon={faTrashAlt} onClick={() => {}} />
            </div>
          </div>
        );
      })}
      <Button
        variant="text"
        buttonText="+ Add Medication"
        onClick={() => {
          openModal("profile-medications-add");
        }}
      />
      <Modal
        modalId="profile-medications-edit"
        title="Editing medication"
        buttonText="Save"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Form.TextInput
            labelText="Name & dosage"
            hintText="Must be at least 5 characters long"
            feedback={errors.nameAndDosage?.message}
            filled={`${!watch("nameAndDosage") ? "filled" : ""}`}
            {...register("nameAndDosage", {
              required: "This field is required",
              minLength: {
                value: 5,
                message: "This field must be at least 5 characters long",
              },
            })}
          />
          <Controller
            name="medicationTime"
            control={control}
            render={({ field }) => (
              <>
                <Form.AddMoreSection buttonText="+ Add reminder">
                  <Form.TimePicker
                    {...field}
                    {...register("medicationTime", {
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
                    feedback={errors.medicationTime?.message}
                  />
                </Form.AddMoreSection>
              </>
            )}
          />
        </Form>
      </Modal>
      <Modal
        modalId="profile-medications-add"
        title="New medication"
        buttonText="Save"
        onSubmit={handleSubmit(onSubmit)}
      >
        Name and Reminders here
      </Modal>
    </div>
  );
};

import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "../../../components";
import { useForm } from "react-hook-form";
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
  myTextField: string;
  anotherTextField: string;
  anEnumField: "one" | "two" | "three";
}

export const ProfileMedications: React.FC = () => {
  const { openModal } = useModal();

  const { handleSubmit } = useForm<MyFormValues>();
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
      <button className="font-text font-medium">+ Add medication</button>
      <Modal
        modalId="profile-medications-edit"
        title="Editing medication"
        buttonText="Save"
        onSubmit={handleSubmit(onSubmit)}
      >
        Name and Reminders here
      </Modal>
    </div>
  );
};

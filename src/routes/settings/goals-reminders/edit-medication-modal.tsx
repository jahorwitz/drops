import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MEDICATIONS } from "../../../graphql/queries/medications";
import { UPDATE_MEDICATION } from "../../../graphql/mutations/medications";
import { MedicationForm } from "../../../components/form/medication-form";

interface Medication {
  id: string;
  name: string;
  amount: number;
  unitOfMeasure: string;
  time?: string;
}

interface EditMedicationModalProps {
  medication: Medication | null;
  onClose: () => void;
  handleDelete: (id: number) => void;
}

export const EditMedicationModal: React.FC<EditMedicationModalProps> = ({
  onClose,
  medication,
  handleDelete,
}) => {
  const { refetch } = useQuery(GET_MEDICATIONS);

  const [updateMedication] = useMutation(UPDATE_MEDICATION, {
    onCompleted: () => {
      refetch();
      onClose();
    },
  });

  const handleUpdate = async (formData: {
    medicationInfo: string;
    time?: string;
  }) => {
    const regex = /^(.+?)\s+(\d+)\s*([a-zA-Z]+)$/;
    const match = formData.medicationInfo.match(regex);
    if (!match) {
      return;
    }
    const name = match[1].trim();
    const amount = parseInt(match[2], 10);
    const unitOfMeasure = match[3].trim();
    await updateMedication({
      variables: {
        id: medication?.id,
        name,
        amount,
        unitOfMeasure,
        time: formData.time || "9:00 AM",
      },
    });
  };

  if (!medication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-full max-w-[370px] h-[65vh] rounded-t-3xl shadow-lg overflow-auto mx-auto min-w-[315px]">
        <MedicationForm
          title="Edit Medication"
          isModal={true}
          onClose={onClose}
          onSubmit={handleUpdate}
          buttonText="Save"
          label="Medication name & dosage"
          medication={medication}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

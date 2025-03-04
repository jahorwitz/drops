import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MEDICATIONS } from "../../../graphql/queries/medications";
import { ADD_MEDICATION } from "../../../graphql/mutations/medications";
import { MedicationForm } from "../../../components/form/medication-form";
import { useAuth } from "../../../hooks/useAuth";

export const AddMedicationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const { currentUser } = useAuth({});

  const { refetch } = useQuery(GET_MEDICATIONS);

  const [addMedication] = useMutation(ADD_MEDICATION, {
    onCompleted: () => {
      refetch();
      onClose();
    },
  });

  // onSubmit handler for adding a medication.
  const handleAdd = async (MedicationFormValues: {
    medicationInfo: string;
    time?: string;
  }) => {
    if (!currentUser || !currentUser.id) {
      alert("User is not authenticated.");
      return;
    }
    // Expect input format: "<name> <amount><unit>"
    // Example: "Ibuprofen 800mg"
    const regex = /^(.+?)\s+(\d+)\s*([a-zA-Z]+)$/;
    const match = MedicationFormValues.medicationInfo.match(regex);
    if (!match) {
      alert(
        "Invalid format. Please enter as 'MedicationName dosage(amount and unit)'"
      );
      return;
    }
    const name = match[1].trim();
    const amount = parseInt(match[2], 10);
    const unitOfMeasure = match[3].trim();
    const time =
      MedicationFormValues.time && MedicationFormValues.time.trim() !== ""
        ? MedicationFormValues.time
        : "9:00 AM";

    await addMedication({
      variables: {
        name,
        amount,
        unitOfMeasure,
        time,
        id: currentUser.id,
      },
    });
  };
  if (!currentUser || !currentUser.id) {
    return null;
  }

  console.log("Current User:", currentUser);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-full max-w-[370px] h-[65vh] rounded-t-3xl shadow-lg overflow-auto mx-auto min-w-[315px]">
        <MedicationForm
          title="Add Medication"
          isModal={true}
          onClose={onClose}
          onSubmit={handleAdd}
          buttonText="Save"
          label="Medication name & dosage"
        />
      </div>
    </div>
  );
};

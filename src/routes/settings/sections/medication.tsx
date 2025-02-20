import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { RemindersWithEdit } from "./reminders-with-edit";
import editIcon from "../../../images/Edit-Icon.png";
import trashIcon from "../../../images/Trash-Icon.svg";
import { GET_MEDICATIONS } from "../../../graphql/queries/medications";
import { DELETE_MEDICATION} from "../../../graphql/mutations/medications";
import { AddMedicationModal } from "./add-medication-modal";
import { EditMedicationModal } from "./edit-medication-modal";

interface Medication {
  id: string;
  name: string;
  amount: number;
  unitOfMeasure: string;
  time?: string;
}

export const Medications: React.FC = () => {
  const [selectedMedication, setSelectedMedication] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch medications
  const { data, loading, error, refetch } = useQuery(GET_MEDICATIONS);
  const medications = data?.authenticatedItem?.medications || [];

  const [deleteMedication] = useMutation(DELETE_MEDICATION, {
    onCompleted: () => refetch(), 
  });

  const openEditModal = (medication: Medication) => {
    setSelectedMedication(medication);
    setIsEditModalOpen(true);
  };

  const openAddMedicationModal = () => {
    setSelectedMedication({});
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteMedication({ variables: { id } });
  };

  return (
    <div>
      <RemindersWithEdit title="Medications" toggleForm={openAddMedicationModal} icon={editIcon}>
        {loading && <p>Loading medications...</p>}
        {error && <p>Error loading medications: {error.message}</p>}

        <ul>
          {medications?.map((med: Medication) => (
            <li key={med.id} className="flex justify-between items-center pb-2 mb-2">
              <div>
                <p className="font-semibold">{med.name}</p>
                <p className="text-sm text-gray-500">Reminder: {med.time}</p>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 cursor-pointer hover:opacity-60"
                  src={editIcon}
                  alt="Edit"
                  onClick={() => openEditModal(med)}
                />
                        <img
                  className="h-8 cursor-pointer hover:opacity-60"
                  src={trashIcon}
                  alt="Delete"
                  onClick={() => handleDelete(med.id)}
                />
              </div>
            </li>
          ))}
        </ul>
        <button onClick={openAddMedicationModal} className="bg-blue-500 text-black px-4 py-2 rounded-lg font-bold text-center w-full">
         + Add Medication
        </button>
      </RemindersWithEdit>

      {isAddModalOpen && <AddMedicationModal onClose={() => setIsAddModalOpen(false)} />}
      {isEditModalOpen && selectedMedication && (
        <EditMedicationModal 
          medication={selectedMedication} 
          onClose={() => setIsEditModalOpen(false)} 
          handleDelete={handleDelete} 
        />
      )}
    </div>
  );
};
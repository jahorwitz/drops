import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { MedicationForm } from "./MedicationForm";
import editIcon from "../../images/Edit-Icon.png";
import trashIcon from "../../images/trashicon.png";
import { SectionWithEdit } from "../../routes/settings/section-with-edit";
import {
  GET_REMINDERS,
  DELETE_REMINDER,
} from "../../graphql/mutations/reminders";


interface Reminder {
  id: string;
  label: string;
  time: string; 
  type: string;
}

export const MedicationsList: React.FC = () => {
  const { data } = useQuery(GET_REMINDERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const [deleteReminder] = useMutation(DELETE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

  const toggleForm = () => {
    setFormOpen(false);
    setEditingReminder(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReminder({ variables: { where: { id } } });
    } catch (err) {
      console.error("Delete reminder failed:", (err as Error).message);
    }
  };

  // Get all reminders, filter for type=medication
  const allReminders: Reminder[] = data?.authenticatedItem?.reminders || [];
  const reminders = allReminders.filter((r) => r.type === "medication");

  return (
    <>
      {(formOpen || editingReminder) ? (
        <MedicationForm
          toggleForm={toggleForm}
          // On edit, split time string into array. On add, timeValues will be undefined and handled in MedicationForm.
          defaultValues={
            editingReminder
              ? {
                  label: editingReminder.label,
                  timeValues: editingReminder.time
                    .split(",")
                    .map((t) => t.trim()),
                }
              : undefined
          }
          title={editingReminder ? "Editing medication" : "New medication"}
          editingId={editingReminder?.id}
        />
      ) : (
        <SectionWithEdit title="Medication" toggleForm={() => setFormOpen(true)}>
          <div className="space-y-3">
            {reminders.length === 0 ? (
              <p className="font-text text-sm opacity-60">No medication reminders yet</p>
            ) : (
              reminders.map((reminder) => (
                <div key={reminder.id} className="mb-3 flex justify-between items-start">
                  <div>
                    <p className="font-text text-sm opacity-60">{reminder.label}</p>
                    <p className="font-text text-black mt-1">
                      {/* Show times as comma separated */}
                      {reminder.time
                        .split(",")
                        .map((t) => t.trim())
                        .join(", ")}
                    </p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                      onClick={() => setEditingReminder(reminder)}
                    />
                    <img
                      src={trashIcon}
                      alt="Delete"
                      className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                      onClick={() => handleDelete(reminder.id)}
                    />
                  </div>
                </div>
              ))
            )}
            <button
              type="button"
              className="font-medium text-[18px] mt-3 text-black text-center w-full"
              onClick={() => setFormOpen(true)}
            >
              + Add medication
            </button>
          </div>
        </SectionWithEdit>
      )}
      <div className="mb-3" />
    </>
  );
};

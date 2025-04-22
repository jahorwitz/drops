import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ReminderForm } from "../reminders/ReminderForm";
import editIcon from "../../images/Edit-Icon.png";
import checkIcon from "../../images/check.png";
import exitIcon from "../../images/Close-Icon.png";
import trashIcon from "../../images/trashicon.png";
import { SectionWithEdit } from "../../routes/settings/section-with-edit";
import {
  GET_REMINDERS,
  DELETE_REMINDER,
  UPDATE_REMINDER,
} from "../../graphql/mutations/reminders";

interface Reminder {
  id: string;
  label: string;
  time: string;
}

export const RemindersList: React.FC = () => {
  const { data, loading, error } = useQuery(GET_REMINDERS);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editHour, setEditHour] = useState("");
  const [editMinute, setEditMinute] = useState("");
  const [editPeriod, setEditPeriod] = useState("AM");

  const [deleteReminder] = useMutation(DELETE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

  const [updateReminder] = useMutation(UPDATE_REMINDER, {
    refetchQueries: ["GetReminders"],
  });

  const toggleForm = () => setFormOpen(!formOpen);

  const handleDelete = async (id: string) => {
    try {
      await deleteReminder({ variables: { where: { id } } });
    } catch (err) {
      console.error("Delete reminder failed:", (err as Error).message);
    }
  };
 // Split the time in string parts
  const handleEditInit = (id: string, time: string) => {
    const [timePart, period] = time.split(" ");
    const [hour, minute] = timePart.split(":");
    setEditingId(id);
    setEditHour(hour);
    setEditMinute(minute);
    setEditPeriod(period);
  };

  const handleSave = async (id: string) => {
    const newTime = `${editHour}:${editMinute} ${editPeriod}`;
    try {
      await updateReminder({
        variables: {
          where: { id },
          data: { time: newTime },
        },
      });
      setEditingId(null);
    } catch (err) {
      console.error("Update reminder failed:", (err as Error).message);
    }
  };

  if (loading) return <p>Loading reminders...</p>;
  if (error) return <p>Error loading reminders</p>;

  const reminders: Reminder[] = data?.authenticatedItem?.reminders || [];

  return (
    <>
      {formOpen ? (
        <ReminderForm toggleForm={toggleForm} onAddMore={() => setFormOpen(true)} />
      ) : (
        <SectionWithEdit title="Meal reminders" toggleForm={toggleForm} icon={editIcon}>
          <div className="space-y-3">
            {reminders.length === 0 ? (
              <p className="font-text text-sm opacity-60">No reminders yet</p>
            ) : (
              reminders.map((reminder) => (
                <div key={reminder.id} className="mb-3 flex justify-between items-start">
                  <div>
                    <p className="font-text text-sm opacity-60">{reminder.label}</p>
                     
                     {/* Action buttons: edit/trash and check/close */}

                    {editingId === reminder.id ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          value={editHour}
                          onChange={(e) => setEditHour(e.target.value)}
                          maxLength={2}
                          placeholder="00"
                          className="w-[60px] h-[60px] text-center border rounded-[8px] font-medium"
                        />
                        <span>:</span>
                        <input
                          type="text"
                          value={editMinute}
                          onChange={(e) => setEditMinute(e.target.value)}
                          maxLength={2}
                          placeholder="00"
                          className="w-[60px] h-[60px] text-center border rounded-[8px] font-medium"
                        />
                        <select
                          value={editPeriod}
                          onChange={(e) => setEditPeriod(e.target.value)}
                          className="w-[60px] h-[60px] text-center border rounded-[8px] font-medium"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    ) : (
                      <p className="font-text text-black mt-1">{reminder.time}</p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    {editingId === reminder.id ? (
                      <div className="flex gap-3 mt-[40px] items-center">
                        <img
                          src={checkIcon}
                          alt="Save"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => handleSave(reminder.id)}
                        />
                        <img
                          src={exitIcon}
                          alt="Cancel"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => setEditingId(null)}
                        />
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center">
                        <img
                          src={editIcon}
                          alt="Edit"
                          className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                          onClick={() => handleEditInit(reminder.id, reminder.time)}
                        />
                        <img
                          src={trashIcon}
                          alt="Delete"
                          className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                          onClick={() => handleDelete(reminder.id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <button
              type="button"
              className="font-medium text-[18px] mt-3 text-black text-center w-full"
              onClick={() => setFormOpen(true)}
            >
              + Add more
            </button>
          </div>
        </SectionWithEdit>
      )}
    </>
  );
};

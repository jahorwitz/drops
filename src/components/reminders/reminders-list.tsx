import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ReminderForm } from "../reminders/ReminderForm";
import { TimePicker } from "../form/time-picker";
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
  const { data } = useQuery(GET_REMINDERS);
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

  // Save updated reminder time and exit editing mode
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

                    {/* Inline editable time picker when reminder is in editing mode */}
                    {editingId === reminder.id ? (
                      <div className="flex items-center gap-10 mt-5 bg-gray-100 rounded-[8px] p-2 w-[346px] h-[76px]">
                        <TimePicker
                          setValue={(field, value) => {
                            if (field === "timeValue") {
                              const [h, m, p] = value.split(":");
                              setEditHour(h);
                              setEditMinute(m.slice(0, 2));
                              setEditPeriod(p);
                            }
                          }}
                        />
                        <div className="flex gap-2 items-center mr-2">
                          <img
                            src={checkIcon}
                            alt="Save"
                            className="w-[26px] h-[26px] cursor-pointer"
                            onClick={() => handleSave(reminder.id)}
                          />
                          <img
                            src={exitIcon}
                            alt="Cancel"
                            className="w-[32px] h-[32px] cursor-pointer"
                            onClick={() => setEditingId(null)}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="font-text text-black mt-1">{reminder.time}</p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    {editingId !== reminder.id && (
                      <>
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
                      </>
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

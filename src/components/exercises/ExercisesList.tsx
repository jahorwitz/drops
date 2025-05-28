import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ExerciseForm } from "./ExerciseForm";
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
  type: string;
  days?: string;
}

export const ExercisesList: React.FC = () => {
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
      console.error("Update failed:", (err as Error).message);
    }
  };

  // get only the exercise type reminders from the user's full reminder list
  const reminders: Reminder[] = data?.authenticatedItem?.reminders || [];
  const exercises = reminders.filter((r) => r.type === "exercise");

  // Capitalizes strings like "monday" into "Monday"
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  //  formatted display like "Mon, Wed / 9:00 AM" or "Daily, 9:00 AM"
  const formatSchedule = (daysStr: string, time: string) => {
    const days = daysStr.split(",").map((d) => d.trim());
    const allDays = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    const isDaily = days.length === 7 || allDays.every(day =>
      days.includes(capitalize(day.toLowerCase()))
    );

    const dayText = isDaily
      ? "Daily"
      : days.map((d) => capitalize(d.toLowerCase().slice(0, 3))).join(", ");

    // Add comma only after "Daily", otherwise use slash
    return isDaily ? `Daily, ${time}` : `${dayText} / ${time}`;
  };

  return (
    <>
      {formOpen ? (
        <ExerciseForm toggleForm={toggleForm} />
      ) : (
        <SectionWithEdit title="Exercises" toggleForm={toggleForm}>
          <div className="space-y-3">
            {exercises.length === 0 ? (
              <p className="font-text text-sm opacity-60">No exercises yet</p>
            ) : (
              exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex justify-between items-start"
                >
                  <div>
                    <p className="font-text text-black font-medium">
                      {exercise.label}
                    </p>
                    {editingId === exercise.id ? (
                      <div className="flex items-center gap-10 mt-2 bg-gray-100 rounded-lg p-2 w-[346px] h-[76px]">
                        <TimePicker
                          hour={editHour}
                          minute={editMinute}
                          period={editPeriod}
                          setValue={(field, value) => {
                           if (field === "timeValue" && typeof value === "string") {
  const [time, per] = value.split(" ");
  const [h, m] = time.split(":");
  setEditHour(h);
  setEditMinute(m);
  setEditPeriod(per);
}

                          }}
                        />
                        <div className="flex gap-2 items-center">
                          <img
                            src={checkIcon}
                            alt="Save"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleSave(exercise.id)}
                          />
                          <img
                            src={exitIcon}
                            alt="Cancel"
                            className="w-7 h-7 cursor-pointer"
                            onClick={() => setEditingId(null)}
                          />
                        </div>
                      </div>
                    ) : (
                      // Show "Daily, 9:00 AM" or "Mon, Wed / 6:00 PM"
                      <p className="text-sm text-black mt-1 opacity-90">
                        {exercise.days
                          ? formatSchedule(exercise.days, exercise.time)
                          : exercise.time}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 items-center">
                    {editingId !== exercise.id && (
                      <>
                        <img
                          src={editIcon}
                          alt="Edit"
                          className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                          onClick={() => handleEditInit(exercise.id, exercise.time)}
                        />
                        <img
                          src={trashIcon}
                          alt="Delete"
                          className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                          onClick={() => handleDelete(exercise.id)}
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
              + Add exercise
            </button>
          </div>
        </SectionWithEdit>
      )}
      <div className="mb-3" />
    </>
  );
};

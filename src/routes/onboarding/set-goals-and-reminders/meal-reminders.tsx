import React, { useState } from "react";
import Section from "./section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface MealReminder {
  descriptions: string[];
  measurement: string;
}

const MealReminders: React.FC = () => {
  const [mealReminders, setMealReminders] = useState<MealReminder[]>([
    { descriptions: ["Meal 1 Reminder"], measurement: "9:00 AM" },
    { descriptions: ["Meal 2 Reminder"], measurement: "12:30 PM" },
    { descriptions: ["Meal 3 Reminder"], measurement: "3:00 PM" },
    { descriptions: ["Snack 1 Reminder"], measurement: "6:00 PM" },
    { descriptions: ["Snack 2 Reminder"], measurement: "6:00 PM" },
  ]);

  const [editingMealIndex, setEditingMealIndex] = useState<number | null>(null);
  const [editedHour, setEditedHour] = useState<string>("09");
  const [editedMinute, setEditedMinute] = useState<string>("00");
  const [editedPeriod, setEditedPeriod] = useState<string>("AM");
  const [showMealSelection, setShowMealSelection] = useState(false);

  const handleMealEditClick = (index: number) => {
    setEditingMealIndex(index);
    const [hour, minuteAndPeriod] = mealReminders[index].measurement.split(":");
    const [minute, period] = minuteAndPeriod.split(" ");
    setEditedHour(hour);
    setEditedMinute(minute);
    setEditedPeriod(period);
  };

  const handleMealSaveClick = (index: number) => {
    const updatedTime = `${editedHour}:${editedMinute} ${editedPeriod}`;
    setMealReminders((prev) =>
      prev.map((reminder, i) =>
        i === index ? { ...reminder, measurement: updatedTime } : reminder
      )
    );
    setEditingMealIndex(null);
  };

  const handleMealCancelClick = () => {
    setMealReminders((prev) =>
      editingMealIndex === prev.length - 1 ? prev.slice(0, -1) : prev
    );
    setEditingMealIndex(null);
  };

  const handleMealAddReminder = (type: "Meal" | "Snack") => {
    const mealCount = mealReminders.filter((r) =>
      r.descriptions[0].includes("Meal")
    ).length;
    const snackCount = mealReminders.filter((r) =>
      r.descriptions[0].includes("Snack")
    ).length;

    const newMealReminder = {
      descriptions: [
        `${type} ${type === "Meal" ? mealCount + 1 : snackCount + 1}`,
        "Reminder",
      ],
      measurement: "12:00 AM",
    };

    setMealReminders((prev) => [...prev, newMealReminder]);
    setEditingMealIndex(mealReminders.length);
    setEditedHour("12");
    setEditedMinute("00");
    setEditedPeriod("AM");
    setShowMealSelection(false);
  };

  const handleMealDeleteReminder = (index: number) => {
    setMealReminders((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Section
      title="Meal Reminders"
      data={mealReminders.map((reminder, index) => ({
        description: reminder.descriptions.join(", "),
        measurement:
          editingMealIndex === index ? (
            <div className="p-2 flex bg-gray-100 items-center gap-2 w-full rounded-[12px]">
              <input
                type="text"
                value={editedHour}
                onChange={(e) => setEditedHour(e.target.value)}
                className="text-center w-[50px] h-[40px] border border-gray-400 bg-gray-100 rounded-lg"
                placeholder="HH"
              />
              <span>:</span>
              <input
                type="text"
                value={editedMinute}
                onChange={(e) => setEditedMinute(e.target.value)}
                className="text-center w-[50px] h-[40px] border border-gray-400 bg-gray-100 rounded-lg"
                placeholder="MM"
              />
              <select
                value={editedPeriod}
                onChange={(e) => setEditedPeriod(e.target.value)}
                className="text-center w-[60px] h-[40px] border border-gray-400 bg-gray-100 rounded-lg"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleMealSaveClick(index)}
                >
                  <FontAwesomeIcon icon={faCheck as IconProp} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={handleMealCancelClick}
                >
                  <FontAwesomeIcon icon={faTimes as IconProp} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <span className="text-base text-gray-800 font-semibold">
                {reminder.measurement}
              </span>

              {editingMealIndex === null && (
                <div className="flex gap-2 ml-auto">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleMealEditClick(index)}
                  >
                    <FontAwesomeIcon icon={faEdit as IconProp} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleMealDeleteReminder(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan as IconProp} />
                  </button>
                </div>
              )}
            </div>
          ),
      }))}
      onAdd={() => setShowMealSelection(!showMealSelection)}
      addButtonText={
        showMealSelection ? (
          <div className="p-2 flex mx-auto bg-gray-100 items-center gap-2 max-w-[304px] rounded-[12px]">
            <button
              className="text-center w-[140px] h-[40px] border border-gray-400 bg-white rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleMealAddReminder("Meal");
              }}
            >
              Meal Reminder
            </button>
            <p className="text-sm text-gray-600 mb-1">OR</p>
            <button
              className="text-center w-[140px] h-[40px] border border-gray-400 bg-white rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleMealAddReminder("Snack");
              }}
            >
              Snack Reminder
            </button>
          </div>
        ) : (
          "+ Add More"
        )
      }
    />
  );
};

export default MealReminders;

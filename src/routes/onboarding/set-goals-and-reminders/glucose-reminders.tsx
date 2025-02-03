import React, { useState } from "react";
import Section from "./section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface GlucoseReminder {
  description: string;
  measurement: string;
}
const GlucoseReminders: React.FC = () => {
  const [glucoseReminders, setGlucoseReminders] = useState<GlucoseReminder[]>([
    { description: "Reminder 1", measurement: "9:00 AM" },
    { description: "Reminder 2", measurement: "12:30 PM" },
    { description: "Reminder 3", measurement: "3:00 PM" },
    { description: "Reminder 4", measurement: "6:00 PM" },
  ]);

  const [editingGlucoseIndex, setEditingGlucoseIndex] = useState<number | null>(
    null
  );
  const [editedHour, setEditedHour] = useState<string>("09");
  const [editedMinute, setEditedMinute] = useState<string>("00");
  const [editedPeriod, setEditedPeriod] = useState<string>("AM");

  const handleGlucoseEditClick = (index: number) => {
    setEditingGlucoseIndex(index);

    const [hour, minuteAndPeriod] =
      glucoseReminders[index].measurement.split(":");
    const [minute, period] = minuteAndPeriod.split(" ");
    setEditedHour(hour);
    setEditedMinute(minute);
    setEditedPeriod(period);
  };

  const handleGlucoseSaveClick = (index: number) => {
    const updatedTime = `${editedHour}:${editedMinute} ${editedPeriod}`;
    setGlucoseReminders((prev) =>
      prev.map((reminder, i) =>
        i === index ? { ...reminder, measurement: updatedTime } : reminder
      )
    );
    setEditingGlucoseIndex(null);
  };

  const handleGlucoseCancelClick = () => {
    setGlucoseReminders((prev) =>
      editingGlucoseIndex === prev.length - 1 ? prev.slice(0, -1) : prev
    );
    setEditingGlucoseIndex(null);
  };

  const handleGlucoseAddReminder = () => {
    const newGlucoseReminder = {
      description: `Reminder ${glucoseReminders.length + 1}`,
      measurement: "12:00 AM",
    };
    setGlucoseReminders((prev) => [...prev, newGlucoseReminder]);
    setEditingGlucoseIndex(glucoseReminders.length);
    setEditedHour("12");
    setEditedMinute("00");
    setEditedPeriod("AM");
  };

  const handleGlucoseDeleteReminder = (index: number) => {
    setGlucoseReminders((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Section
      title="Glucose Measurement Reminders"
      data={glucoseReminders.map((reminder, index) => ({
        description: reminder.description,
        measurement:
          editingGlucoseIndex === index ? (
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
                  onClick={() => handleGlucoseSaveClick(index)}
                >
                  <FontAwesomeIcon icon={faCheck as IconProp} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={handleGlucoseCancelClick}
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

              {editingGlucoseIndex === null && (
                <div className="flex gap-2 ml-auto">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleGlucoseEditClick(index)}
                  >
                    <FontAwesomeIcon icon={faEdit as IconProp} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleGlucoseDeleteReminder(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan as IconProp} />
                  </button>
                </div>
              )}
            </div>
          ),
      }))}
      onAdd={handleGlucoseAddReminder}
      addButtonText="+ Add Reminder"
    />
  );
};

export default GlucoseReminders;

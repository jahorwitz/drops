import React, { useState, useEffect } from "react";
import Section from "./section";
import editIcon from "../../../images/Edit-Icon.png";
import deleteIcon from "../../../images/Delete-Icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useQuery, useMutation } from "@apollo/client";
import { TimePicker } from "../../../components/form/time-picker";
import { useForm } from "react-hook-form";
import {
  GET_USER_ID,
  GET_GLUCOSE_REMINDERS,
  ADD_GLUCOSE_REMINDER,
  UPDATE_GLUCOSE_REMINDER,
  DELETE_GLUCOSE_REMINDER,
} from "./queries";

interface Reminder {
  id: string;
  description: string;
  notificationTime: string;
}

const GlucoseReminders: React.FC = () => {
  const { data: authData } = useQuery(GET_USER_ID);
  const userId = authData?.authenticatedItem?.id;

  const { data, loading, error, refetch } = useQuery<{
    user: { id: string; notifications: Reminder[] };
  }>(GET_GLUCOSE_REMINDERS, {
    variables: { userId },
    skip: !userId,
  });

  const [addReminder] = useMutation(ADD_GLUCOSE_REMINDER);
  const [updateReminder] = useMutation(UPDATE_GLUCOSE_REMINDER);
  const [deleteReminder] = useMutation(DELETE_GLUCOSE_REMINDER);

  const [glucoseReminders, setGlucoseReminders] = useState<Reminder[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { setValue, watch, register } = useForm();

  useEffect(() => {
    if (!data || !data.user?.notifications) return;

    const sortedReminders = [...data.user.notifications].sort(
      (a, b) =>
        new Date(a.notificationTime).getTime() -
        new Date(b.notificationTime).getTime()
    );

    setGlucoseReminders(sortedReminders);
  }, [data]);

  const formatTime = (isoString: string) => {
    if (!isoString) return "";

    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${period}`;
  };

  if (loading) return <p>Loading reminders...</p>;
  if (error) return <p>Error loading reminders.</p>;

  const handleGlucoseAddReminder = () => {
    if (!userId) {
      alert("User is not authenticated.");
      return;
    }

    const reminderCount = (glucoseReminders.length || 0) + 1;

    const newReminder: Reminder = {
      id: `temp-${Date.now()}`,
      description: `Reminder ${reminderCount}`,
      notificationTime: "",
    };

    setGlucoseReminders((prev) => [...prev, newReminder]);
    setEditingIndex(glucoseReminders.length);
  };

  const handleGlucoseDeleteReminder = async (index: number) => {
    const reminder = glucoseReminders[index];
    const reminderId = reminder.id;

    if (!reminderId.startsWith("temp-")) {
      try {
        await deleteReminder({ variables: { id: reminderId } });
      } catch (error) {
        console.error("Error deleting reminder from backend:", error);
        return;
      }
    }

    let updatedReminders = glucoseReminders.filter((_, i) => i !== index);
    let glucoseIndex = 1;
    updatedReminders = updatedReminders.map((r) => ({
      ...r,
      description: `Reminder ${glucoseIndex++}`,
    }));

    setGlucoseReminders(updatedReminders);

    for (const updatedReminder of updatedReminders) {
      if (!updatedReminder.id.startsWith("temp-")) {
        await updateReminder({
          variables: {
            id: updatedReminder.id,
            notificationTime: updatedReminder.notificationTime,
            description: updatedReminder.description,
          },
        });
      }
    }

    refetch();
  };

  const handleGlucoseSaveClick = async (index: number) => {
    if (!userId) {
      alert("User is not authenticated.");
      return;
    }

    const timeValue = watch("timeValue");
    if (!timeValue || !timeValue.includes(":")) {
      alert("Please select a valid time.");
      return;
    }

    const [time, period] = timeValue.split(" ");
    const [hourStr, minuteStr] = time.split(":");

    let hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const updatedTime = new Date();
    updatedTime.setHours(hour, minute, 0, 0);

    const newReminder = glucoseReminders[index];

    if (newReminder.id.startsWith("temp-")) {
      await addReminder({
        variables: {
          userId,
          description: newReminder.description,
          notificationTime: updatedTime.toISOString(),
        },
      });

      refetch();
    } else {
      await updateReminder({
        variables: {
          id: newReminder.id,
          notificationTime: updatedTime.toISOString(),
          description: newReminder.description,
        },
      });

      setGlucoseReminders((prevReminders) =>
        prevReminders.map((reminder) =>
          reminder.id === newReminder.id
            ? { ...reminder, notificationTime: updatedTime.toISOString() }
            : reminder
        )
      );
    }

    setEditingIndex(null);
  };

  const handleEditClick = (index: number) => {
    const reminder = glucoseReminders[index];
    const date = new Date(reminder.notificationTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    const formattedTime = `${hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${period}`;

    setValue("timeValue", formattedTime, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setEditingIndex(index);
  };

  const handleGlucoseCancelClick = () => {
    setEditingIndex(null);

    setGlucoseReminders((prev) => {
      if (editingIndex !== null && prev[editingIndex]?.id.startsWith("temp-")) {
        return prev.filter((_, i) => i !== editingIndex);
      }
      return prev;
    });
  };

  return (
    <Section
      title="Glucose Measurement Reminders"
      data={glucoseReminders.map((reminder, index) => ({
        description: reminder.description,
        measurement:
          editingIndex === index ? (
            <div className="p-2 flex bg-gray-100 items-center gap-2 w-full rounded-[12px]">
              <TimePicker
                setValue={setValue}
                {...register("timeValue")}
                value={
                  editingIndex !== null && glucoseReminders[editingIndex]
                    ? formatTime(
                        glucoseReminders[editingIndex].notificationTime
                      )
                    : ""
                }
              />

              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={() => handleGlucoseSaveClick(index)}
                >
                  <FontAwesomeIcon icon={faCheck as IconProp} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 mr-2"
                  onClick={handleGlucoseCancelClick}
                >
                  <FontAwesomeIcon icon={faTimes as IconProp} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>
                {new Date(reminder.notificationTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
              <div className="flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(index)}
                >
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="w-[32px] h-[32px]"
                  />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleGlucoseDeleteReminder(index)}
                >
                  <img
                    src={deleteIcon}
                    alt="Edit"
                    className="w-[32px] h-[32px]"
                  />
                </button>
              </div>
            </div>
          ),
      }))}
      onAdd={handleGlucoseAddReminder}
      addButtonText="+ Add reminder"
    />
  );
};

export default GlucoseReminders;

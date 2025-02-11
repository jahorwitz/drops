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
  GET_MEAL_REMINDERS,
  ADD_MEAL_REMINDER,
  UPDATE_MEAL_REMINDER,
  DELETE_MEAL_REMINDER,
} from "./queries";

interface Reminder {
  id: string;
  description: string;
  notificationTime: string;
}

const MealReminders: React.FC = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(GET_USER_ID);
  const userId = userData?.authenticatedItem?.id;
  const { data, loading, error, refetch } = useQuery(GET_MEAL_REMINDERS, {
    variables: { userId },
    skip: !userId,
  });

  const [addReminder] = useMutation(ADD_MEAL_REMINDER);
  const [updateReminder] = useMutation(UPDATE_MEAL_REMINDER);
  const [deleteReminder] = useMutation(DELETE_MEAL_REMINDER);

  const [mealReminders, setMealReminders] = useState<Reminder[]>([]);
  const [editingMealIndex, setEditingMealIndex] = useState<number | null>(null);
  const [showMealSelection, setShowMealSelection] = useState(false);

  const { setValue, watch, register } = useForm();

  useEffect(() => {
    if (!data || !data.user?.notifications) return;

    const reminders: Reminder[] = [...data.user.notifications];

    let mealIndex = 1;
    let snackIndex = 1;

    const meals = reminders
      .filter((r) => r.description.includes("Meal"))
      .sort(
        (a, b) =>
          new Date(a.notificationTime).getTime() -
          new Date(b.notificationTime).getTime()
      )
      .map((reminder) => ({
        ...reminder,
        description: `Meal ${mealIndex++} Reminder`,
      }));

    const snacks = reminders
      .filter((r) => r.description.includes("Snack"))
      .sort(
        (a, b) =>
          new Date(a.notificationTime).getTime() -
          new Date(b.notificationTime).getTime()
      )
      .map((reminder) => ({
        ...reminder,
        description: `Snack ${snackIndex++} Reminder`,
      }));

    setMealReminders([...meals, ...snacks]);
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

  if (userLoading || loading) return <p>Loading reminders...</p>;
  if (userError) return <p>Error fetching user ID.</p>;
  if (error) return <p>Error loading reminders.</p>;

  const handleMealAddReminder = (type: "Meal" | "Snack") => {
    const mealCount = mealReminders.filter((r) =>
      r.description.includes("Meal")
    ).length;
    const snackCount = mealReminders.filter((r) =>
      r.description.includes("Snack")
    ).length;

    const newMealReminder: Reminder = {
      id: `temp-${Date.now()}`,
      description: `${type} ${
        type === "Meal" ? mealCount + 1 : snackCount + 1
      } Reminder`,
      notificationTime: "",
    };

    setMealReminders((prev) => {
      const updatedReminders = [...prev, newMealReminder];

      let mealIndex = 1;
      let snackIndex = 1;

      return updatedReminders.map((r) => {
        if (r.description.includes("Meal")) {
          return { ...r, description: `Meal ${mealIndex++} Reminder` };
        }
        if (r.description.includes("Snack")) {
          return { ...r, description: `Snack ${snackIndex++} Reminder` };
        }
        return r;
      });
    });

    setEditingMealIndex(mealReminders.length);
    setShowMealSelection(false);
  };

  const handleMealDeleteReminder = async (index: number) => {
    const reminder = mealReminders[index];
    const reminderId = reminder.id;

    if (!reminderId.startsWith("temp-")) {
      try {
        await deleteReminder({ variables: { id: reminderId } });
      } catch (error) {
        console.error("Error deleting reminder from backend:", error);
        return;
      }
    }

    let updatedReminders = mealReminders.filter((_, i) => i !== index);

    let mealIndex = 1;
    let snackIndex = 1;

    updatedReminders = updatedReminders.map((r) => {
      if (r.description.includes("Meal")) {
        return { ...r, description: `Meal ${mealIndex++} Reminder` };
      }
      if (r.description.includes("Snack")) {
        return { ...r, description: `Snack ${snackIndex++} Reminder` };
      }
      return r;
    });

    setMealReminders(updatedReminders);
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

  const handleMealSaveClick = async (index: number) => {
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

    let updatedReminders = [...mealReminders];
    const reminder = updatedReminders[index];

    if (!reminder) {
      console.error("Reminder not found for index:", index);
      return;
    }

    updatedReminders[index] = {
      ...reminder,
      notificationTime: updatedTime.toISOString(),
    };

    let mealIndex = 1;
    let snackIndex = 1;

    updatedReminders = updatedReminders.map((r) => {
      if (r.description.includes("Meal")) {
        return { ...r, description: `Meal ${mealIndex++} Reminder` };
      }
      if (r.description.includes("Snack")) {
        return { ...r, description: `Snack ${snackIndex++} Reminder` };
      }
      return r;
    });

    if (reminder.id.startsWith("temp-")) {
      const response = await addReminder({
        variables: {
          userId,
          description: reminder.description,
          notificationTime: updatedTime.toISOString(),
        },
      });

      if (response.data.createNotification) {
        refetch();
      }
    } else {
      await updateReminder({
        variables: {
          id: reminder.id,
          notificationTime: updatedTime.toISOString(),
          description: reminder.description,
        },
      });
    }

    setMealReminders(updatedReminders);
    setEditingMealIndex(null);
    refetch();
  };

  const handleMealCancelClick = () => {
    setShowMealSelection(false);
    setEditingMealIndex(null);
    setMealReminders((prev) => {
      if (
        editingMealIndex !== null &&
        prev[editingMealIndex]?.id.startsWith("temp-")
      ) {
        return prev.filter((_, i) => i !== editingMealIndex);
      }
      return prev;
    });
  };

  const handleEditClick = (index: number) => {
    const reminder = mealReminders[index];
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

    setEditingMealIndex(index);
  };

  return (
    <Section
      title="Meal Reminders"
      data={mealReminders.map((reminder: Reminder, index: number) => ({
        description: reminder.description,
        measurement:
          editingMealIndex === index ? (
            <div className="p-2 flex bg-gray-100 items-center gap-2 w-full rounded-[12px]">
              <TimePicker
                labelText=""
                setValue={setValue}
                {...register("timeValue")}
                value={
                  editingMealIndex !== null && mealReminders[editingMealIndex]
                    ? formatTime(
                        mealReminders[editingMealIndex].notificationTime
                      )
                    : ""
                }
              />

              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={() => handleMealSaveClick(index)}
                >
                  <FontAwesomeIcon icon={faCheck as IconProp} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 mr-2"
                  onClick={handleMealCancelClick}
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
                <button onClick={() => handleEditClick(index)}>
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="w-[32px] h-[32px]"
                  />
                </button>
                <button onClick={() => handleMealDeleteReminder(index)}>
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
      onAdd={() => setShowMealSelection(!showMealSelection)}
      addButtonText={
        showMealSelection ? (
          <div className="p-2 flex mx-auto bg-gray-100 items-center gap-2 max-w-[304px] rounded-[12px]">
            <button
              className="text-center w-[140px] h-[40px] border border-gray-400 bg-white rounded-lg"
              onClick={() => handleMealAddReminder("Meal")}
            >
              Meal Reminder
            </button>
            <button
              className="text-center w-[140px] h-[40px] border border-gray-400 bg-white rounded-lg"
              onClick={() => handleMealAddReminder("Snack")}
            >
              Snack Reminder
            </button>
            <button
              className="text-red-500 hover:text-red-700 mr-2"
              onClick={() => handleMealCancelClick()}
            >
              <FontAwesomeIcon icon={faTimes as IconProp} />
            </button>
          </div>
        ) : (
          "+ Add more"
        )
      }
    />
  );
};

export default MealReminders;

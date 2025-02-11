import React from "react";
import GlucoseLevels from "./glucose-levels";
import GlucoseReminders from "./glucose-reminders";
import MealReminders from "./meal-reminders";

const GoalsAndReminders: React.FC = () => {
  return (
    <div className="p-1 bg-gray-100 min-h-screen flex flex-col mx-auto min-w-[315px] max-w-[370px]">
      <div className="bg-gray shadow-md rounded-lg p-4">
        <GlucoseLevels />
        <GlucoseReminders />
        <MealReminders />
      </div>
    </div>
  );
};

export default GoalsAndReminders;

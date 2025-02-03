import React, { useState } from "react";
import Section from "./section";

const GlucoseLevels: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [glucoseGoals, setGlucoseGoals] = useState({
    fastingMin: 70,
    fastingMax: 100,
    afterMealMin: 100,
    afterMealMax: 180,
  });

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const handleSaveGoals = () => {
    setIsEditing(false);
  };

  return (
    <Section
      title="Glucose Levels Goals"
      data={
        isEditing
          ? [
              {
                description: (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Fasting Glucose Levels
                      </h3>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Min. value (in Mg/L)
                          </label>
                          <input
                            type="number"
                            className="w-full border rounded-md p-2"
                            value={glucoseGoals.fastingMin}
                            onChange={(e) =>
                              setGlucoseGoals((prev) => ({
                                ...prev,
                                fastingMin: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Max. value (in Mg/L)
                          </label>
                          <input
                            type="number"
                            className="w-full border rounded-md p-2"
                            value={glucoseGoals.fastingMax}
                            onChange={(e) =>
                              setGlucoseGoals((prev) => ({
                                ...prev,
                                fastingMax: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        After Meals Glucose Levels
                      </h3>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Min. value (in Mg/L)
                          </label>
                          <input
                            type="number"
                            className="w-full border rounded-md p-2"
                            value={glucoseGoals.afterMealMin}
                            onChange={(e) =>
                              setGlucoseGoals((prev) => ({
                                ...prev,
                                afterMealMin: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Max. value (in Mg/L)
                          </label>
                          <input
                            type="number"
                            className="w-full border rounded-md p-2"
                            value={glucoseGoals.afterMealMax}
                            onChange={(e) =>
                              setGlucoseGoals((prev) => ({
                                ...prev,
                                afterMealMax: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800"
                        onClick={handleSaveGoals}
                      >
                        Update Goals
                      </button>
                    </div>
                  </div>
                ),
                measurement: "",
              },
            ]
          : [
              {
                description: "Fasting glucose levels",
                measurement: `${glucoseGoals.fastingMin} – ${glucoseGoals.fastingMax} Mg/L`,
              },
              {
                description: "After meals glucose levels",
                measurement: `${glucoseGoals.afterMealMin} – ${glucoseGoals.afterMealMax} Mg/L`,
              },
            ]
      }
      isEditing={isEditing}
      onEdit={handleToggleEdit}
      showAddButton={false}
      singleEditButton={true}
    />
  );
};

export default GlucoseLevels;

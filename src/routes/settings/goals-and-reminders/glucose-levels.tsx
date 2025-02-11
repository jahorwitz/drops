import React, { useState, useEffect } from "react";
import Section from "./section";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER_ID,
  GET_GLUCOSE_GOAL,
  UPDATE_GLUCOSE_GOAL,
  CREATE_GLUCOSE_GOAL,
} from "./queries";

const GlucoseLevels: React.FC = () => {
  const {
    data: authData,
    loading: authLoading,
    error: authError,
  } = useQuery(GET_USER_ID);
  const userId = authData?.authenticatedItem?.id;

  const { data, loading, error, refetch } = useQuery(GET_GLUCOSE_GOAL, {
    variables: { userId },
    skip: !userId,
  });

  const [updateGoal] = useMutation(UPDATE_GLUCOSE_GOAL);

  interface Goal {
    goalId: string;
    fastingMin: number;
    fastingMax: number;
    afterMealMin: number;
    afterMealMax: number;
    id: string;
    name: string;
    amount: number;
    unitOfMeasure: string;
  }

  const [glucoseGoals, setGlucoseGoals] = useState({
    fastingMinId: "",
    fastingMin: 70,

    fastingMaxId: "",
    fastingMax: 100,

    afterMealMinId: "",
    afterMealMin: 100,

    afterMealMaxId: "",
    afterMealMax: 180,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data?.goals && data.goals.length > 0) {
      const fastingMinGoal = data.goals.find(
        (goal: Goal) => goal.name === "Fasting Min Glucose"
      );
      const fastingMaxGoal = data.goals.find(
        (goal: Goal) => goal.name === "Fasting Max Glucose"
      );
      const afterMealMinGoal = data.goals.find(
        (goal: Goal) => goal.name === "After Meal Min Glucose"
      );
      const afterMealMaxGoal = data.goals.find(
        (goal: Goal) => goal.name === "After Meal Max Glucose"
      );

      if (
        fastingMinGoal &&
        fastingMaxGoal &&
        afterMealMinGoal &&
        afterMealMaxGoal
      ) {
        setGlucoseGoals({
          fastingMinId: fastingMinGoal.id,
          fastingMin: fastingMinGoal.amount,
          fastingMaxId: fastingMaxGoal.id,
          fastingMax: fastingMaxGoal.amount,
          afterMealMinId: afterMealMinGoal.id,
          afterMealMin: afterMealMinGoal.amount,
          afterMealMaxId: afterMealMaxGoal.id,
          afterMealMax: afterMealMaxGoal.amount,
        });
      }
    }
  }, [data]);

  const handleToggleEdit = () => setIsEditing((prev) => !prev);

  const [createGoal] = useMutation(CREATE_GLUCOSE_GOAL);

  const handleError = (error: unknown) => {
    console.error("Error:", error);

    if (error instanceof Error) {
      alert("Failed to create goals: " + error.message);
    } else {
      alert("Failed to create goals due to an unknown error.");
    }
  };

  const handleSaveGoals = async () => {
    if (
      glucoseGoals.fastingMin < 0 ||
      glucoseGoals.fastingMax < 0 ||
      glucoseGoals.afterMealMin < 0 ||
      glucoseGoals.afterMealMax < 0
    ) {
      alert("Values cannot be negative.");
      return;
    }

    if (glucoseGoals.fastingMax < glucoseGoals.fastingMin) {
      alert("Fasting Max must be greater than or equal to Fasting Min.");
      return;
    }

    if (glucoseGoals.afterMealMax < glucoseGoals.afterMealMin) {
      alert("After Meal Max must be greater than or equal to After Meal Min.");
      return;
    }

    const goalsToUpdate = [];

    if (glucoseGoals.fastingMinId) {
      goalsToUpdate.push({
        id: glucoseGoals.fastingMinId,
        name: "Fasting Min Glucose",
        amount: glucoseGoals.fastingMin,
        unitOfMeasure: "mg/dL",
      });
    } else {
      await createGoal({
        variables: {
          userId,
          name: "Fasting Min Glucose",
          amount: glucoseGoals.fastingMin,
          unitOfMeasure: "mg/dL",
        },
      }).catch(handleError);
    }

    if (glucoseGoals.fastingMaxId) {
      goalsToUpdate.push({
        id: glucoseGoals.fastingMaxId,
        name: "Fasting Max Glucose",
        amount: glucoseGoals.fastingMax,
        unitOfMeasure: "mg/dL",
      });
    } else {
      await createGoal({
        variables: {
          userId,
          name: "Fasting Max Glucose",
          amount: glucoseGoals.fastingMax,
          unitOfMeasure: "mg/dL",
        },
      }).catch(handleError);
    }

    if (glucoseGoals.afterMealMinId) {
      goalsToUpdate.push({
        id: glucoseGoals.afterMealMinId,
        name: "After Meal Min Glucose",
        amount: glucoseGoals.afterMealMin,
        unitOfMeasure: "mg/dL",
      });
    } else {
      await createGoal({
        variables: {
          userId,
          name: "After Meal Min Glucose",
          amount: glucoseGoals.afterMealMin,
          unitOfMeasure: "mg/dL",
        },
      }).catch(handleError);
    }

    if (glucoseGoals.afterMealMaxId) {
      goalsToUpdate.push({
        id: glucoseGoals.afterMealMaxId,
        name: "After Meal Max Glucose",
        amount: glucoseGoals.afterMealMax,
        unitOfMeasure: "mg/dL",
      });
    } else {
      await createGoal({
        variables: {
          userId,
          name: "After Meal Max Glucose",
          amount: glucoseGoals.afterMealMax,
          unitOfMeasure: "mg/dL",
        },
      }).catch(handleError);
    }

    try {
      await Promise.all(
        goalsToUpdate.map((goal) =>
          updateGoal({
            variables: {
              id: goal.id,
              name: goal.name,
              amount: goal.amount,
              unitOfMeasure: goal.unitOfMeasure,
            },
          })
        )
      );

      setIsEditing(false);
      refetch();
    } catch (error: unknown) {
      console.error("Error updating goals:", error);

      if (error instanceof Error) {
        alert(`Failed to update goals: ${error.message}`);
      } else {
        alert("Failed to update goals due to an unknown error.");
      }
    }
  };

  if (authLoading || loading) return <p>Loading glucose goals...</p>;
  if (authError) return <p>Error fetching user ID.</p>;
  if (error) return <p>Error loading glucose goals.</p>;

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
                      <h3 className="mb-2 text-black font-normal text-base">
                        Fasting Glucose Levels
                      </h3>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Min. value (in Mg/L)
                          </label>
                          <input
                            type="number"
                            className="w-full h-[60px] border rounded-md p-2 text-black text-base text-center"
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
                            className="w-full h-[60px] border rounded-md p-2 text-black text-base text-center"
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
                      <h3 className="mb-2 text-black font-normal text-base">
                        After Meals Glucose Levels
                      </h3>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Min. value (in Mg/L)
                          </label>
                          <input
                            type="number"
                            className="w-full h-[60px] border rounded-md p-2 text-black text-base text-center"
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
                            className="w-full h-[60px] border rounded-md p-2 text-black text-base text-center"
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
                        className="bg-black text-white h-[60px] w-full py-2 rounded-md hover:bg-gray-800 text-lg font-medium"
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

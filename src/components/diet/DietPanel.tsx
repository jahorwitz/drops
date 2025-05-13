import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_DIET } from "../../graphql/queries/diet";
import editIcon from "../../images/Edit-Icon.png";
import { DietForm } from "../diet/DietForm";
import { SectionWithEdit } from "../../routes/settings/section-with-edit";

export const DietPanel = () => {
  const [formOpen, setFormOpen] = useState(false);
  // Fetch diet data for the current authenticated user
  const { data } = useQuery(GET_USER_DIET);
  const diet = data?.authenticatedItem?.diet;
  
  // If the form is open, the modal will show; otherwise it will show diet summary

  return (
    <>
      {formOpen ? (
        <DietForm toggleForm={() => setFormOpen(false)} />
      ) : (
        <SectionWithEdit title="Diet" toggleForm={() => setFormOpen(true)}>
          {diet ? (
            <div className="space-y-3 font-text text-sm text-black opacity-90">
              {[
                ["Meals per day", diet.mealsPerDay],
                ["Snacks per day", diet.snacksPerDay],
                ["Carbs per day (grams)", diet.carbsPerDay],
                ["Fiber per day (grams)", diet.fiberPerDay],
                ["Cups of water per day", diet.waterPerDay],
                ["Calorie limit", `${diet.calorieLimit} kcal`],
              ].map(([label, value], idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span>{label}: {value}</span>
                  <img
                    src={editIcon}
                    alt="Edit"
                    className="w-[20px] h-[22px] cursor-pointer opacity-80 hover:opacity-100"
                    onClick={() => setFormOpen(true)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm opacity-60">No diet data set</p>
          )}
        </SectionWithEdit>
      )}
      <div className="mb-3" />
    </>
  );
};

import React from "react";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../../components";

export const ProfileExercise: React.FC = () => {
  return (
    <div className="bg-blue p-20">
      <div className="flex flex-col bg-white p-3 pb-5 gap-4 rounded-xl">
        <h2 className="font-text text-section-subtext">Exercises</h2>
        <div className="flex justify-between">
          <div>
            <p className="text-paragraph-lg text-black">Exercise</p>
            <p className="text-paragraph-sm text-black/60">Time & Freq</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="icon"
              icon={faEdit}
              onClick={() => alert("Edit workout")}
            />
            <Button
              variant="icon"
              icon={faTrashCan}
              onClick={() => alert("Delete workout")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

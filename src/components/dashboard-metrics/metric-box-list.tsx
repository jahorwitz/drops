import React from "react";
import { MetricBox } from "./metric-box";

interface MetricBoxListProps {
  metricBoxes: Array<{
    variant: "Glucose" | "Medication" | "Activity" | "Mood" | "Diet";
    boxColor?: "Yellow" | "Blue" | "Pink" | "Green" | "Purple";
    promptVisible?: boolean;
  }>;
}

export const MetricBoxList: React.FC<MetricBoxListProps> = ({
  metricBoxes,
}) => {
  return (
    <div className="grid grid-cols-2 w-[390px] gap-2 bg-lightGray p-4 rounded-lg mx-auto">
      {metricBoxes.map((box, i) => {
        return (
          <MetricBox
            key={i}
            variant={box.variant}
            boxColor={box.boxColor}
            promptVisible={box.promptVisible}
          ></MetricBox>
        );
      })}
    </div>
  );
};

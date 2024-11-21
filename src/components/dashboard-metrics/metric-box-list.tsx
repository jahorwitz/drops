import React from "react";
import { MetricBox } from "./metric-box";

interface MetricBoxListProps {
  metricBoxes: React.ReactElement<typeof MetricBox>[];
}

export const MetricBoxList: React.FC<MetricBoxListProps> = ({
  metricBoxes,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {metricBoxes.map((box) => {
        return box;
      })}
    </div>
  );
};

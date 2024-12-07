import { MetricBoxList } from "../components";

export const Dashboard: React.FC = () => {
  return (
    <MetricBoxList
      metricBoxes={[
        {
          variant: "Glucose",
          boxColor: "Pink",
        },
        {
          variant: "Medication",
          boxColor: "Yellow",
        },
        {
          variant: "Activity",
          boxColor: "Blue",
        },
        {
          variant: "Mood",
          boxColor: "Purple",
        },
        {
          variant: "Diet",
          boxColor: "Green",
        },
      ]}
    ></MetricBoxList>
  );
};

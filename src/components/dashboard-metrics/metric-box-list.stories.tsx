import { MetricBoxList } from "./metric-box-list";

export default {
  title: "DashboardMetrics",
  component: MetricBoxList,
};

export const MetricList = () => {
  return (
    <MetricBoxList
      metricBoxes={[
        {
          variant: "Glucose",
          boxColor: "Pink",
          promptVisible: true,
        },
        {
          variant: "Medication",
          boxColor: "Yellow",
        },
        {
          variant: "Activity",
          boxColor: "Blue",
          promptVisible: true,
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

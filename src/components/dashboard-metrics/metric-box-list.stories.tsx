import { MetricBoxList } from "./metric-box-list";
import { MemoryRouter } from "react-router";

export default {
  title: "DashboardMetrics",
  component: MetricBoxList,
};

export const MetricList = () => {
  return (
    <MemoryRouter>
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
    </MemoryRouter>
  );
};

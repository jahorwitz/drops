import { StepWizardProvider } from "./stepWizardContext";
import { StepWizard } from "./stepWizard";

export default {
  title: "StepWizard",
  component: StepWizard,
};

export const StepWizardStory = () => {
  return (
    <StepWizardProvider>
      <StepWizard title="Setting up">{/* Steps here */}</StepWizard>
    </StepWizardProvider>
  );
};

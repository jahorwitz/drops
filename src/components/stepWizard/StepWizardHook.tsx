import { useContext } from "react";
import { StepWizardContext } from "./stepWizardContext";

export const useStepWizard = () => {
  const context = useContext(StepWizardContext);
  if (context === undefined) {
    throw new Error("useStepWizard must be used within a StepWizardProvider");
  }
  return context;
};

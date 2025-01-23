import { useContext } from "react";
import { WizardContext } from "../components/step-wizard/steps";

export const useStepWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("Step must be used within Steps");
  }
  return context;
};
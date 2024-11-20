import React from "react";
import { useStepWizard } from "../../hooks/useStepWizard";

type StepProps = {
  stepNumber: number;
  children: React.ReactNode;
};

export const Step: React.FC<StepProps> = ({ stepNumber, children }) => {
  const { currentStep } = useStepWizard();

  if (currentStep !== stepNumber) return null;

  return <div>{children}</div>;
};

export default Step;

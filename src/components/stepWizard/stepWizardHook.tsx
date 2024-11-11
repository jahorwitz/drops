// Step.tsx
import React from "react";
import { useStepWizard } from "../store/stepWizardContext";
import { Button } from "../button";

type StepProps = {
  stepNumber: number;
  children: React.ReactNode;
};

const StepWizardHook: React.FC<StepProps> = ({ stepNumber, children }) => {
  const { currentStep } = useStepWizard();

  if (currentStep !== stepNumber) return null;

  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default StepWizardHook;

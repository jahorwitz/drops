import React, { createContext, useCallback, useState, ReactNode } from "react";

interface contextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

export const StepWizardContext = createContext<contextType | undefined>(
  undefined,
);

interface StepWizardProps {
  children?: ReactNode;
}

export const StepWizardProvider = ({ children }: StepWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = React.Children.count(children);

  const nextStep = useCallback(
    () => setCurrentStep((step) => Math.min(step + 1, totalSteps)),
    [totalSteps],
  );
  const previousStep = useCallback(
    () => setCurrentStep((step) => Math.max(step - 1, 1)),
    [],
  );
  const goToStep = useCallback(
    (step: number) =>
      setCurrentStep(() => Math.max(Math.min(step, 1), totalSteps)),
    [totalSteps],
  );

  return (
    <StepWizardContext.Provider
      value={{ currentStep, totalSteps, nextStep, previousStep, goToStep }}
    >
      {children}
    </StepWizardContext.Provider>
  );
};

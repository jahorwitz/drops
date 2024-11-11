// Step.tsx
import React from "react";
import { useStepWizard } from "../store/stepWizardContext";
import { Button } from "../button";

type StepProps = {
  stepNumber: number;
  children: React.ReactNode;
};

const Step: React.FC<StepProps> = ({ stepNumber, children }) => {
  const { currentStep, goToNextStep, goToPreviousStep, goToStep } = useStepWizard();

  if (currentStep !== stepNumber) return null;

  return (
    <div>
      <div>{children}</div>
      <div>
        {currentStep > 1 && (
          <Button
            variant="primary"
            buttonText="Back"
            onClick={goToPreviousStep}
          />
        )}
        {currentStep <= stepNumber && (
          <Button variant="primary" buttonText="Next" onClick={goToNextStep} />
        )}
      </div>
    </div>
  );
};

export default Step;

import React from "react";
import { useStepWizard } from "../Steps";
import { Button } from "../../button";

type StepProps = {
  stepNumber: number;
};

const Footer: React.FC<StepProps> = ({ stepNumber }) => {
  const { currentStep, goToNextStep, goToPreviousStep } = useStepWizard();

  return (
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
  );
};

export default Footer;

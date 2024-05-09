import { useStepWizard } from "./StepWizardHook";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  title: string;
}

export const StepWizard = ({ children, title }: Props) => {
  const { currentStep, totalSteps } = useStepWizard();

  return (
    <div>
      <span className="font-text text-black/60 font-paragraph-lg">
        {title} • Step {currentStep}/{totalSteps}
      </span>
      {React.Children.toArray(children)[currentStep - 1]}
    </div>
  );
};

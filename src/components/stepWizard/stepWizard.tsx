import { useStepWizard } from "./StepWizardHook";
import React, { ReactNode } from "react";

interface Props {
  stepNumber: number;
  children?: ReactNode;
  title: string;
  buttonName: string;
  skip:string;
}

export const StepWizard = ({ children, title, buttonName, stepNumber, skip }: Props) => {
  const { currentStep, totalSteps, nextStep } = useStepWizard();

  if(stepNumber === 0) {
    return null
  }

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="w-[86.6px] h-[46px]">Drops Care</h1>
      <span className="font-text text-black/60 font-paragraph-lg">
        {title} • Step {currentStep}/{totalSteps}
      </span>
      {React.Children.toArray(children)[currentStep - 1]}
      </div>
      <button className="w-[38px] h-[22px]">{skip}</button>
      <button className="bg-[#121212] w-[358px] h-[60px] rounded-lg text-[#F5F5F5] mt-[32px]" onClick={nextStep}>{buttonName}</button>
    </div>
  );
};

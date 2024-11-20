import React from "react";

import { Steps } from "./Steps";
import { stepArray } from "./example usage/page";
import Step from "./Step";

export const stepWizard: React.FC = () => {
  return (
    <Steps totalSteps={stepArray.length}>
      {stepArray.map((step) => {
        return <div>{step}</div>;
      })}
    </Steps>
  );
};

export default {
  title: "StepWizard",
  component: stepWizard,
  Step,
};

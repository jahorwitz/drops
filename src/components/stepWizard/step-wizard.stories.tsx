// onBoardingStepWizard
import React from "react";
import Wizard from "./wizard";
import Step from "./step";
import DietGoals from "../../routes/onboarding/diet.goals";
import { GlucoseNotificationPrompt } from "../../routes/onboarding/glucose-notification-prompt";

export const onBoardingStepWizard: React.FC = () => {
  return (
    <Wizard totalSteps={3}>
      <Step stepNumber={1}>
        <GlucoseNotificationPrompt />
      </Step>
      <Step stepNumber={2}>
        <GlucoseNotificationPrompt />
      </Step>
      <Step stepNumber={3}>
        <GlucoseNotificationPrompt />
      </Step>
    </Wizard>
  );
};

export default {
  title: "StepWizard",
  component: Wizard,
  Step,
};

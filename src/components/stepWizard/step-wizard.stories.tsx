// onBoardingStepWizard
import React from "react";
import Wizard from "./wizard";
import Step from "./stepWizardHook";
import DietGoals from "../../routes/onboarding/diet.goals";
import { GlucoseNotificationPrompt } from "../../routes/onboarding/glucose-notification-prompt";

export const onBoardingStepWizard: React.FC = () => {
  return (
    <Wizard totalSteps={3}>
      <Step stepNumber={1}>
        {/* Here is where you would import your header, page, and footer
        The buttons in stepWizardHook are just to show functionality. The
        idea is you would import stepWizard in your footer and add the buttons and
        onClick functions there.
        Eventually, this hook would just look something like :
        <Wizard>
          <step stepNumber={1}>
            <div>
              <Header />
              <children />
              <footer />
            </div>  
          </step>
          ....more steps    
        */}
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

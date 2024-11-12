// onBoardingStepWizard
import React from "react";
import Wizard from "./wizard";
import StepWizardHook from "./stepWizardHook";
import { Header } from "./example usage/header";
import Footer from "./example usage/footer";
import { Page } from "./example usage/page";

export const onBoardingStepWizard: React.FC = () => {
  return (
    <Wizard totalSteps={3}>
      <StepWizardHook stepNumber={1}>
        {/* Here is where you would import your header, page, and footer
        The idea is you would useStepWizard where ever you needed button
        functionality or currentStep/totalStep information.*/}

        <Header />
        <Page />
        <Footer stepNumber={1} />
      </StepWizardHook>
      <StepWizardHook stepNumber={2}>
        <Header />
        <Page />
        <Footer stepNumber={2} />
      </StepWizardHook>
      <StepWizardHook stepNumber={3}>
        <Header />
        <Page />
        <Footer stepNumber={3} />
      </StepWizardHook>
    </Wizard>
  );
};

export default {
  title: "StepWizard",
  component: Wizard,
  StepWizardHook,
};

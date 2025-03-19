import React, { ReactNode } from "react";

import { Steps } from "../steps";
import Step from "../step";


/* using as template*/
export const stepWizard: React.FC = () => {
  //Mock Array that would be sent to a stepWizard. The goal is to only send an array of <Step /> components inside a <Steps /> component.
  const Step1: ReactNode = (
    <Step stepNumber={1}>
      <Header />
      <div>Page Content</div>
      <Footer stepNumber={1} />
    </Step>
  );

  const Step2: ReactNode = (
    <Step stepNumber={2}>
      <Header />
      <div>Page Content</div>
      <Footer stepNumber={2} />
    </Step>
  );

  const Step3: ReactNode = (
    <Step stepNumber={3}>
      <Header />
      <div>Page Content</div>
      <Footer stepNumber={3} />
    </Step>
  );

  const stepArray = [Step1, Step2, Step3];

  return (
    <Steps totalSteps={stepArray.length}>
      {stepArray.map((step, id) => {
        return <div key={id}>{step}</div>;
      })}
    </Steps>
  );
};

export default {
  title: "StepWizard",
  component: stepWizard,
  Step,
};
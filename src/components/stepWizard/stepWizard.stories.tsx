import { StepWizardProvider } from "../store/stepWizardContext";
import { StepWizard } from "./stepWizard";

export default {
  title: "StepWizard",
  component: StepWizard, StepWizardProvider,
};

export const StepWizardStory = () => {

  return (
    <StepWizardProvider>
      <StepWizard title="Glucose" buttonName="Next" stepNumber={1} skip=""> 
        <p>
        Setting up your desired glucose levels
        </p>
        </StepWizard>
        <StepWizard title="Glucose" buttonName="Set up notifications" stepNumber={2} skip="">
          <p>
            Get notified for your glucose levels
          </p>
        </StepWizard>
        <StepWizard title="Glucose" skip="Skip" buttonName="Save notifications" stepNumber={3}>
          <p>
            Setting up your medication reminders
          </p>
        </StepWizard>
        <StepWizard title="Goals" skip="Skip" buttonName="Save goals" stepNumber={4}>
          <p>
            Setting up exercise goals
          </p>
        </StepWizard>
        <StepWizard title="Goals" skip="Skip" buttonName="Save goals" stepNumber={5}>
          <p>
            Setting up diet goals
          </p>
        </StepWizard>
        <StepWizard title="Goals" skip="Skip" buttonName="Save notifications" stepNumber={6}>
          <p>
          Setting up diet goals reminders
          </p>
        </StepWizard>
    </StepWizardProvider>
  );
};

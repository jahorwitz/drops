import { StepWizardProvider } from "../store/stepWizardContext";
import { StepWizard } from "./stepWizard";

export default {
  title: "StepWizard",
  component: StepWizard, StepWizardProvider,
};

export const StepWizardStory = () => {

  return (
    <StepWizardProvider>
      <StepWizard title="Setting up" > 
        <p>
        Setting up your desired glucose levels
        </p>
        </StepWizard>
        <StepWizard title="Setting up">
          <p>
            Get notified for your glucose levels
          </p>
        </StepWizard>
        <StepWizard title="Setting up">
          <p>
            Setting up your medication reminders
          </p>
        </StepWizard>
        <StepWizard title="Setting up">
          <p>
            Setting up exercise goals
          </p>
        </StepWizard>
        <StepWizard title="Setting up">
          <p>
            Setting up diet goals
          </p>
        </StepWizard>
        <StepWizard title="Setting up">
          <p>
          Setting up diet goals reminders
          </p>
        </StepWizard>
    </StepWizardProvider>
  );
};

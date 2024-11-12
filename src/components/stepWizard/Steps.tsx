import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type WizardContextType = {
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

type WizardProviderProps = {
  children: ReactNode;
  totalSteps: number;
};

export const Steps: React.FC<WizardProviderProps> = ({
  children,
  totalSteps,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = useCallback(
    () => setCurrentStep((step) => Math.min(step + 1, totalSteps)),
    [totalSteps],
  );

  const goToPreviousStep = useCallback(
    () => setCurrentStep((step) => Math.max(step - 1, 1)),
    [],
  );

  const goToStep = useCallback(
    (step: number) =>
      setCurrentStep(() => Math.max(Math.min(step, 1), totalSteps)),
    [totalSteps],
  );

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        totalSteps,
        goToNextStep,
        goToPreviousStep,
        goToStep,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useStepWizard = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("Step must be used within Steps");
  }
  return context;
};

import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect
} from "react";

type WizardContextType = {
  currentStep: number;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;
};

type WizardProviderProps = {
  children: ReactNode;
  totalSteps: number;
};

export const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const Steps: React.FC<WizardProviderProps> = ({
  children,
  totalSteps,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

useEffect(() => {
  const stored = localStorage.getItem("registrationStep");
  if (stored) {
    const step = parseInt(stored);
    setCurrentStep(step);
  }
}, [setCurrentStep]);

// Helpers
const updateStep = useCallback((step: number) => {
  const bounded = Math.max(1, Math.min(step, totalSteps));
  localStorage.setItem("registrationStep", String(bounded));
  setCurrentStep(bounded);
}, [totalSteps]);

const goToNextStep = useCallback(() => {
  updateStep(currentStep + 1);
}, [currentStep, updateStep]);

const goToPreviousStep = useCallback(() => {
  updateStep(currentStep - 1);
}, [currentStep, updateStep]);

const goToStep = useCallback((step: number) => {
  updateStep(step);
}, [updateStep]);

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

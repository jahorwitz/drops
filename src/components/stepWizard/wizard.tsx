// Wizard.tsx
import React from 'react';
import { WizardProvider } from '../store/stepWizardContext';

type WizardProps = {
  totalSteps: number;
  children: React.ReactNode;
};

const Wizard: React.FC<WizardProps> = ({ totalSteps, children }) => {
  return (
    <WizardProvider totalSteps={totalSteps}>
      <div>{children}</div>
    </WizardProvider>
  );
};

export default Wizard;
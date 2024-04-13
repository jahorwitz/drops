import { RadioGroup } from '../formRadioGroup';
import { UseFormRegisterReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

export const Default = () => {
  const options: Option[] = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
  ];

  const errors = null; 
  const selectedOption = null; 

  const register: UseFormRegisterReturn = {
    onChange: async () => {},
    onBlur: async () => {},
    name: 'radioGroup',
    ref: () => {},
  };

  return <RadioGroup title="My Radio Group" description="Select an option" options={options} errors={errors} selectedOption={selectedOption} register={register} />;
};

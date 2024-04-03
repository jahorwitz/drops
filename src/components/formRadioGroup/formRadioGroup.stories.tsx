import { Form } from "../form";
import { RadioGroup } from '../formRadioGroup';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

type Option = {
  value: string;
  label: string;
};

export const Default = () => {
  const options: Option[] = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
  ];

  return <RadioGroup title="My Radio Group" description="Select an option" options={options} />;
};

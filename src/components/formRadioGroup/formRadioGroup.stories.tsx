import { Form } from "../form";
import { RadioGroup } from '../formRadioGroup';

export default {
  title: 'RadioGroup',
  component: RadioGroup,
};

export const Default = () => <RadioGroup title="My Radio Group" description="Select an option" options={['Option 1', 'Option 2', 'Option 3']} />;

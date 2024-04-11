import React from "react";
import { Meta, Story } from "@storybook/react";
import { FormSelect, SelectProps } from "./form.Select";

export default {
  title: "FormSelect",
  component: FormSelect,
  argTypes: {
    options: { control: "array" }, // This line is to make the options array editable in Storybook
  },
} as Meta;

const Template: Story<SelectProps> = (args) => <FormSelect {...args} />;

export const SelectOptions = Template.bind({});
SelectOptions.args = {
  title: "Select Option",
  name: "selectOption",
  options: [
    { label: "Option 1" },
    { label: "Option 2" },
    { label: "Option 3" },
  ],
  placeholderValue: "Choose an option",
  description: "Please select one option",
};

import React from "react";
import { Story, Meta } from "@storybook/react";

import FormSelect, { SelectProps } from "./form.Select"; // Assuming SelectProps is exported from form.Select

export default {
  title: "FormSelect",
  component: FormSelect,
} as Meta;

const Template: Story<SelectProps> = (args) => <FormSelect {...args} />;

export const SelectOptions = Template.bind({});
SelectOptions.args = {
  title: "Sex",
  placeholderValue: "Choose",
  hintText: "",
  options: ["male", "female", "other"],
};

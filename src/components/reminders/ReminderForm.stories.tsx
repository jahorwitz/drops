import { Meta, StoryFn } from "@storybook/react";
import { ReminderForm } from "./ReminderForm";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../store/apollo-client"; 

export default {
  title: "Components/ReminderForm",
  component: ReminderForm,
  decorators: [
    (Story) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
} as Meta<typeof ReminderForm>;

const Template: StoryFn<typeof ReminderForm> = (args) => <ReminderForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  toggleForm: () => alert("Form toggled"),
  onDelete: () => alert("Delete clicked"),
};

export const WithDefaultValues = Template.bind({});
WithDefaultValues.args = {
  toggleForm: () => alert("Form toggled"),
  defaultValues: { label: "Meal 1", time: "09:00 AM" },
};

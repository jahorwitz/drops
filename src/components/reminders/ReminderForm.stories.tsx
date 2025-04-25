import { Meta, StoryObj } from "@storybook/react";
import { ReminderForm } from "./ReminderForm";

const meta: Meta<typeof ReminderForm> = {
  title: "Components/ReminderForm",
  component: ReminderForm,
};

export default meta;

type Story = StoryObj<typeof ReminderForm>;

export const Default: Story = {
  args: {
    toggleForm: () => alert("Form toggled"),
    onAddMore: () => alert("Add more clicked"),
    onDelete: () => alert("Delete clicked"),
  },
};

export const WithDefaultValues: Story = {
  args: {
    toggleForm: () => alert("Form toggled"),
    defaultValues: { label: "Meal 1", time: "09:00 AM" },
  },
};

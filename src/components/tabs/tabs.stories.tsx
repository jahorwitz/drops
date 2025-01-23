import { Meta, StoryFn } from "@storybook/react";
import Tabs from "./tabs";
import { TabsProps } from "./tabs";

export default {
  title: "Components/Tabs",
  component: Tabs,
  argTypes: {
    tabs: {
      control: "object",
      description: "Array of tabs with labels and content",
    },
  },
} as Meta;

const Template: StoryFn<TabsProps> = (args: TabsProps) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { label: "Tab One", content: "Content for Tab One" },
    { label: "Tab Two", content: "Content for Tab Two" },
  ],
};

export const ThreeTabs = Template.bind({});
ThreeTabs.args = {
  tabs: [
    { label: "Overview", content: "Overview content goes here" },
    { label: "Details", content: "Detailed content goes here" },
    { label: "Settings", content: "Settings content goes here" },
  ],
};

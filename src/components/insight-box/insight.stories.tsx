import { Meta, StoryFn } from "@storybook/react";
import { Insight, InsightProps } from "./insight-box";
import { RiCapsuleLine } from "react-icons/ri";

export default {
  title: "Insight",
  component: Insight,
} as Meta;

const Template: StoryFn<InsightProps> = (args: InsightProps) => (
  <Insight {...args} />
);

export const ActivityNotification = Template.bind({});
ActivityNotification.args = {
  title: "Activity",
  message: "You have a scheduled workout at 5 PM.",
  icon: <RiCapsuleLine className="w-8 h-8 fill-blue " />,
};

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

export const InsightBox = Template.bind({});
InsightBox.args = {
  title: "You need to exercise more!",
  message: "Try walking for at least 1 hour per day.",
  icon: <RiCapsuleLine className="w-8 h-8 fill-blue " />,
};

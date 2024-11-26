import { Meta, StoryFn } from "@storybook/react";
import { Insight, InsightProps } from "./insight-box";
import { HiLightBulb } from "react-icons/hi";

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
  message: "Try walking for at least 1 hour per day",
  icon: <HiLightBulb className="w-10 h-10 fill-yellow" />,
};

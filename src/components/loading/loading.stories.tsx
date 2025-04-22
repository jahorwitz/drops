import { Meta, StoryFn } from "@storybook/react";
import { LoadingCircle } from "./loading-circle";
import { HiLightBulb } from "react-icons/hi";

export default {
  title: "Loading",
  component: LoadingCircle,
} as Meta;

const Template: StoryFn = () => <LoadingCircle />;

export const InsightBox = Template.bind({});
InsightBox.args = {
  title: "You need to exercise more!",
  message: "Try walking for at least 1 hour per day",
  icon: <HiLightBulb className="w-10 h-10 fill-yellow" />,
};

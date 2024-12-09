import Tabs from "./tabs";

export default {
  title: "Components/Tabs", // This will show up in Storybook's sidebar
  component: Tabs, // The component you want to document
};

export const Default = () => {
  // Here’s a simple example of the tabs data you might pass in, you can also just pass the component directly:
  const exampleTabs = [
    { label: "Tab One", content: <div>Content of Tab One</div> },
    { label: "Tab Two", content: <div>Content of Tab Two</div> },
  ];

  return <Tabs tabs={exampleTabs} />;
};

export const ThreeTabs = () => {
  const exampleTabs = [
    { label: "Overview", content: <div>This is the Overview</div> },
    { label: "Details", content: <div>These are the Details</div> },
    { label: "Settings", content: <div>Here are the Settings</div> },
  ];

  return <Tabs tabs={exampleTabs} />;
};

import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export type TabItem = {
  label: string;
  content: React.ReactNode; // or JSX.Element
};

export type TabsProps = {
  tabs: TabItem[];
};

function Tabs({ tabs }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      defaultIndex={0}
    >
      <TabList className="mb-5 max-w-[354px] w-full h-10 flex">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `text-base outline-none font-rubik text-black font-normal leading-5 p-2.5 border-b-2 w-1/2 ${
                selected ? "border-black" : "opacity-30"
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="max-w-[370px] w-full ">
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            {Array.isArray(tab.content) ? (
              <>{tab.content.map((Component, idx) => <React.Fragment key={idx}>{Component}</React.Fragment>)}</>
            ) : (
              tab.content
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}

export default Tabs;

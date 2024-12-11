import React, { useState } from "react";
import { Tab } from "@headlessui/react";

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
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      defaultIndex={0}
    >
      <Tab.List className="mb-5 max-w-[354px] w-full h-10 flex">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `text-base outline-none font-rubik text-[#121212] font-normal leading-5 p-2.5 border-b-2 w-1/2 ${
                selected ? "border-black" : "opacity-30"
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="max-w-[370px] w-full">
        {tabs.map((tab, index) => (
          <Tab.Panel key={index}>{tab.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default Tabs;

import React, { useState } from "react";
import { Tab } from "@headlessui/react";

type TabItem = {
  label: string;
  content: React.ReactNode; // or JSX.Element, depending on your needs
};

type TabsProps = {
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
      <Tab.List className="mb-[20px] max-w-[354px] w-full h-[40px] flex">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `text-base outline-none font-sans font-normal leading-[19px] p-2.5 border-b-2 w-[50%] ${
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

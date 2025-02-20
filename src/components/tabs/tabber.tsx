import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

interface TabberProps {
  tabs: string[]; // Array of tab names
  panels: ReactNode[]; // Array of corresponding components
}

export const Tabber: React.FC<TabberProps> = ({ tabs, panels }) => {
  if (tabs.length !== panels.length) {
    console.error("Tabber: The number of tabs and panels must be equal");
    return null; // to prevent rendering if they are not matched
  }

  return (
    <Tab.Group>
      <Tab.List className="flex bg-lightGray items-center mb-5">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `text-black border-black text-base w-[177px] p-0 border-b-[1px] ${
                selected
                  ? "font-bold border-b-[2px]"
                  : "border-opacity-30 text-opacity-60"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>

      {/* Tab Content */}
      <Tab.Panels className="w-full flex justify-center">
        {panels.map((panel, index) => (
          <Tab.Panel key={index}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

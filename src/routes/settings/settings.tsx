import React from "react";
import { useNavigate } from "react-router";
import { Button, SimpleContainer } from "../../components";
import { LogoutButtons } from "./logout-buttons";
import { Credentials } from "./sections/credentials";
import { HealthData } from "./sections/health-data";
import { RemindersList } from "../../components/reminders/reminders-list";
import Tabs, { TabItem } from "../../components/tabs/tabs"; 

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    {
      label: "Main info",
      content: (
        <>
          <Credentials />
          <HealthData />
        </>
      ),
    },
    {
      label: "Goals & reminders",
      content: (
        <>
          <RemindersList />
        </>
      ),
    },
  ];

  return (
    <SimpleContainer>
      <Button
        variant="text"
        className="absolute left-4 opacity-100 hover:opacity-60 text-base max-w-max pt-0"
        buttonText="< Back"
        onClick={() => navigate(-1)}
      />
      <h2 className="text-section-subtext font-text mb-5">Profile settings</h2>

      <Tabs tabs={tabs} />

      <LogoutButtons />
    </SimpleContainer>
  );
};

import React from "react";
import { useNavigate } from "react-router";
import { Button, SimpleContainer } from "../../components";
import { LogoutButtons } from "./logout-buttons";
import { Credentials } from "./sections/credentials";
import { HealthData } from "./sections/health-data";
import { RemindersList } from "../../components/reminders/reminders-list";
import { DietPanel } from "../../components/diet/DietPanel";
import { ExercisesList } from "../../components/exercises/ExercisesList"; 
import Tabs from "../../components/tabs/tabs";

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  const settingsCategories = [
    {
      label: "Main Info",
      content: [<Credentials />, <HealthData />],
    },
    {
      label: "Goals & reminders",
      content: (
        <>
          <ExercisesList /> 
          <DietPanel />
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
      <Tabs tabs={settingsCategories} />
      <LogoutButtons />
    </SimpleContainer>
  );
};

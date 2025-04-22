import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, SimpleContainer } from "../../components";
import { LogoutButtons } from "./logout-buttons";
import { Credentials } from "./sections/credentials";
import { HealthData } from "./sections/health-data";
import { RemindersList } from "../../components/reminders/reminders-list";

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"main" | "goals">("main");

  return (
    <SimpleContainer>
      <Button
        variant="text"
        className="absolute left-4 opacity-100 hover:opacity-60 text-base max-w-max pt-0"
        buttonText="< Back"
        onClick={() => navigate(-1)}
      />
      <h2 className="text-section-subtext font-text mb-5">Profile settings</h2>

      <div className="flex mb-5">
        <Button
          variant="text"
          className={`text-base w-[177px] p-0 ${
            activeTab === "main"
              ? "border-b-[1px] border-black border-opacity-30"
              : ""
          }`}
          buttonText="Main info"
          onClick={() => setActiveTab("main")} // Switch tabs 
        />
        <Button
          variant="text"
          className={`text-base w-[177px] p-0 ${
            activeTab === "goals"
              ? "border-b-[1px] border-black border-opacity-30"
              : ""
          }`}
          buttonText="Goals & reminders"
          onClick={() => setActiveTab("goals")} 
        />
      </div>
     
      {activeTab === "main" && (
        <>
          <Credentials />
          <HealthData />
        </>
      )}

      {activeTab === "goals" && (
        <>
          <RemindersList />
        </>
      )}

      <LogoutButtons />
    </SimpleContainer>
  );
};

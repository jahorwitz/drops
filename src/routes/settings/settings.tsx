import { useNavigate } from "react-router";
import { Button } from "../../components";
import { LogoutButtons } from "./logout-buttons";
import { Tabber } from "../../components/tabs/tabber";
import { GoalsReminders } from "./goals-reminders/goals-reminders";
import { MainInfo } from "./main-info/main-info";

export const Settings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-lightGray items-center pb-11">
      <Button
        variant="text"
        className="absolute left-4 opacity-100 hover:opacity-60 text-base max-w-max pt-0"
        buttonText="< Back"
        onClick={() => navigate(-1)}
      />

      <h2 className="text-section-subtext font-text mb-5">Profile settings</h2>

      <Tabber
        tabs={["Main info", "Goals & reminders"]}
        panels={[<MainInfo />, <GoalsReminders />]}
      />
      <LogoutButtons />
    </div>
  );
};

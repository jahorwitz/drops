import { useNavigate } from "react-router";
import { Button, SimpleContainer } from "../../components";
import { LogoutButtons } from "./logout-buttons";
import { Credentials } from "./sections/credentials";
import { HealthData } from "./sections/health-data";

export const Settings: React.FC = () => {
  const navigate = useNavigate();
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
          className="active:opacity-100 border-b-[1px] border-black border-opacity-30 text-base w-[177px] p-0"
          buttonText="Main info"
          onClick={() => alert("Main info")}
        />
        <Button
          variant="text"
          className="active:opacity-100 border-b-[1px] border-black border-opacity-30 text-base w-[177px] p-0"
          buttonText="Goals & reminders"
          onClick={() => alert("Goals & reminders")}
        />
      </div>
      <Credentials />
      <HealthData />
      <LogoutButtons />
    </SimpleContainer>
  );
};

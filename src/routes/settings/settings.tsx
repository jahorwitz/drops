import { Button } from "../../components"
import { LogoutButtons } from "./logout-buttons"
import { SectionWithEdit } from "./section-with-edit"
import { SectionList } from "./section-list"
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const Settings: React.FC = () => {
  const { user }= useCurrentUser();
  // created a standin password since retrieving the hashed password would be useless to the user as well a potential security threat
  const credentials = {Name: user?.name, Email: user?.email, Password: "..............."}
  
  return (
    <div className="flex flex-col bg-lightGray items-center pb-11">
      <Button
        variant="text"
        className="fixed left-4 opacity-100 hover:opacity-60 text-base max-w-max pt-0"
        buttonText="< Back"
        onClick={() => alert("Log out")}
      />
      <h2 className="text-section-subtext font-text mb-5">Profile settings</h2>
      <div className="flex mb-5">
        <Button
          variant="text"
          className="active:opacity-100 border-b-[1px] border-black border-opacity-30 text-base w-[177px] p-0"
          buttonText="Main info"
          onClick={() => alert("Log out")}
        />
        <Button
          variant="text"
          className="active:opacity-100 border-b-[1px] border-black border-opacity-30 text-base w-[177px] p-0"
          buttonText="Goals & reminders"
          onClick={() => alert("Log out")}
        />
      </div>
        <SectionWithEdit title="Credentials" link="/settings/credentials-edit">
          <SectionList list={credentials} />
        </SectionWithEdit>
      <LogoutButtons />
    </div>
  );
};

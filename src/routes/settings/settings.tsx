import { Button } from "../../components"
import { LogoutButtons } from "./logout-buttons"
import { SectionWithEdit } from "./section-with-edit"

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightGray items-center pb-11">
      <Button
        variant="text"
        className="fixed left-4 opacity-100 hover:opacity-60 text-base max-w-max pt-0"
        buttonText="< Back"
        onClick={() => alert("Log out")}
      />
      <h2 className="text-section-subtext">Profile settings</h2>
      <div className="flex">
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
        <SectionWithEdit title="Credentials">
          <p>Name</p>
          <p>Rachel</p>
          <p>Email</p>
          <p>c@gmail.com</p>
          <p>password</p>
          <p>.......</p>
        </SectionWithEdit>
      <LogoutButtons />
    </div>
  )
}
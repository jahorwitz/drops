import { Button } from "../../components"

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightGray items-center gap-8">
      <div className="flex flex-col items-center gap-8 my-[60px]">
        <Button
          variant="text"
          className="opacity-100 hover:opacity-60 text-base max-w-max"
          buttonText="Log out"
          onClick={() => alert("Log out")}
        />
        <Button
          variant="text"
          className="text-red opacity-100 hover:opacity-60 text-base max-w-max"
          buttonText="Delete profile"
          onClick={() => alert("Profile deleted!")}
        />
      </div> 
    </div>
  )
}
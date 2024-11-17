import { Button } from "../components";

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightGray">
      <Button
        variant="text"
        className="opacity-100 hover:opacity-60 text-base"
        buttonText="Log out"
        onClick={() => alert("Log out")}
      />
      <Button
        variant="text"
        className="text-red opacity-100 hover:opacity-60 text-base"
        buttonText="Delete profile"
        onClick={() => alert("Profile deleted!")}
      />
    </div>
  );
};

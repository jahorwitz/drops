import { Button } from "../../components"
import { useAuth } from "../../hooks/useAuth";

export const LogoutButtons: React.FC = () => {
  const handleLogoutSuccess = () => console.log("Logged Out");
  const auth = useAuth({ onLogoutSuccess: handleLogoutSuccess });

  return (
    <>
      <Button
        variant="text"
        className="opacity-100 hover:opacity-60 text-base max-w-max pt-0 mt-[60px]"
        buttonText="Log out"
        onClick={() => auth.logout}
      />
      <Button
        variant="text"
        className="text-red opacity-100 hover:opacity-60 text-base max-w-max"
        buttonText="Delete profile"
        onClick={() => alert("Profile deleted!")}
      />
    </>
  )
}
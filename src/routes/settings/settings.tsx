import { Button } from "../../components";
import useAuth from "../../hooks/useAuth";

export const Settings: React.FC = () => {
  const handleLogoutSuccess = () => console.log("Logged Out");
  const auth = useAuth({ onLogoutSuccess: handleLogoutSuccess });
  
  return <Button variant="text" buttonText="Log Out" onClick={auth.logout} />;
};

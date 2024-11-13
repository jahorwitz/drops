import { Button } from "../../components";
import useAuth from "../../hooks/useAuth";

const { logout } = useAuth();

export const Settings: React.FC = () => {
  return <Button variant="text" buttonText="Log Out" onClick={logout} />;
};

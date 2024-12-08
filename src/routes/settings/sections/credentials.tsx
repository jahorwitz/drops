import { useCurrentUser } from "../../../hooks/useCurrentUser";
import editIcon from "../../../images/Edit-Icon.png"
import { CredentialsForm } from "./credentials-form";
import { SectionWithEdit } from "../section-with-edit";
import {SectionList } from "../section-list";

export const Credentials: React.FC = () => {
  const { user }= useCurrentUser();
  // created a standin password since retrieving the hashed password would be useless to the user as well a potential security threat
  const credentials = {Name: user?.name, Email: user?.email, Password: "..............."}
  
  return (
    <div>
    <CredentialsForm />
    <SectionWithEdit title="Credentials" link="/settings/credentials-edit" icon={editIcon}>
          <SectionList list={credentials} />
    </SectionWithEdit>
    </div>
  )
}
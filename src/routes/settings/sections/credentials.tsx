import { useCurrentUser } from "../../../hooks/useCurrentUser";
import editIcon from "../../../images/Edit-Icon.png"
import { CredentialsForm } from "./credentials-form";
import { SectionWithEdit } from "../section-with-edit";
import {SectionList } from "../section-list";
import { useState } from "react";

export const Credentials: React.FC = () => {
  const [credentialsFormOpen, setCredentialsFormOpen] = useState(false);
  const { user }= useCurrentUser();

  // created a standin password since retrieving the hashed password would be useless to the user as well a potential security threat
  const credentials = {Name: user?.name, Email: user?.email, Password: "..............."};
  const defaultFormValues = {name: user?.name, email: user?.email};

  const toggleForm = () => {
    setCredentialsFormOpen(!credentialsFormOpen);
  }
  
  return (
    <div>
      {credentialsFormOpen? (
          <CredentialsForm toggleForm={toggleForm} defaultValues={defaultFormValues} />
        ) : (
          <SectionWithEdit 
            title="Credentials" 
            toggleForm={toggleForm} 
            icon={editIcon}
          >
            <SectionList list={credentials} />
          </SectionWithEdit>
        )
      }

    </div>
  )
}
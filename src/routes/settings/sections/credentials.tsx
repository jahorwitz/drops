import editIcon from "../../../images/Edit-Icon.png";
import { CredentialsForm } from "./credentials-form";
import { SectionWithEdit } from "../section-with-edit";
import { SectionList } from "../section-list";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export const Credentials: React.FC = () => {
  const [credentialsFormOpen, setCredentialsFormOpen] = useState(false);
  const { currentUser } = useAuth();

  const credentials = {
    Name: currentUser?.name,
    Email: currentUser?.email,
    Password: "...............",
  };

  const toggleForm = () => {
    setCredentialsFormOpen(!credentialsFormOpen);
  };

  return (
    <div>
      {currentUser && credentialsFormOpen ? (
        <CredentialsForm
          toggleForm={toggleForm}
          defaultValues={{
            name: currentUser.name ?? "",
            email: currentUser.email ?? "",
          }}
        />
      ) : (
        <SectionWithEdit
          title="Credentials"
          toggleForm={toggleForm}
          icon={editIcon}
        >
          <SectionList list={credentials} />
        </SectionWithEdit>
      )}
    </div>
  );
};

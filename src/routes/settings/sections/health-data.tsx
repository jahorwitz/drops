import editIcon from "../../../images/Edit-Icon.png"
import { CredentialsForm } from "./credentials-form";
import { SectionWithEdit } from "../section-with-edit";
import { SectionList } from "../section-list";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export const HealthData: React.FC = () => {
  const [healthDataFormOpen, sethealthDataFormOpen] = useState(false);
  const { currentUser } = useAuth({});

  const healthData = { DateOfBirth:"01/01/1980", Weight: currentUser?.email, Height: "5'5\"", Sex: "Female", DiabetesType: "Type 1" };
  const defaultFormValues = { name: currentUser?.name, email: currentUser?.email };

  const toggleForm = () => {
    sethealthDataFormOpen(!healthDataFormOpen);
  }

  return (
    <div className="mt-3">
      {healthDataFormOpen ? (
        <CredentialsForm toggleForm={toggleForm} defaultValues={defaultFormValues} />
      ) : (
        <SectionWithEdit
          title="Health data"
          toggleForm={toggleForm}
          icon={editIcon}
        >
          <SectionList list={healthData} />
        </SectionWithEdit>
      )
      }

    </div>
  )
}
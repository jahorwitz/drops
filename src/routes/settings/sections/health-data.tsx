import editIcon from "../../../images/Edit-Icon.png"
import { HealthDataForm } from "./health-data-form";
import { SectionWithEdit } from "../section-with-edit";
import { SectionList } from "../section-list";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export const HealthData: React.FC = () => {
  const [healthDataFormOpen, sethealthDataFormOpen] = useState(false);
  const { currentUser } = useAuth({});
  const { dateOfBirth, weight, height, sex, diabetesType } = currentUser;

  const formatString = (input: string): string => {
    if (!input) return input;
  
    // Capitalize the first letter
    let formatted = input.charAt(0).toUpperCase() + input.slice(1);
  
    // Check if the string ends with a number and separate it with a space
    formatted = formatted.replace(/(\D)(\d+)$/, '$1 $2');
  
    return formatted;
  } 

  const healthData = { dateOfBirth: dateOfBirth, weight: `${weight} lbs`, height: `${Math.floor(height / 12)}'${height % 12}"`, sex: formatString(sex), diabetesType: formatString(diabetesType[0])};

  const toggleForm = () => {
    sethealthDataFormOpen(!healthDataFormOpen);
  }

  return (
    <div className="mt-3">
      {healthDataFormOpen ? (
        <HealthDataForm toggleForm={toggleForm} defaultValues={{...healthData, sex: sex, diabetesType: diabetesType[0]}} />
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
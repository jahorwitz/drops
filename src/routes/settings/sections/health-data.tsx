import editIcon from "../../../images/Edit-Icon.png"
import { HealthDataForm } from "./health-data-form";
import { SectionWithEdit } from "../section-with-edit";
import { SectionList } from "../section-list";
import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

export const HealthData: React.FC = () => {
  const [healthDataFormOpen, sethealthDataFormOpen] = useState(false);
  const { currentUser } = useAuth({});
  const { dateOfBirth, weight, height, sex, diabetesType, email } = currentUser;

  const [feet, setFeet] = useState<number>(999);
  const [inches, setInches] = useState<number>(999);
  const [formatedHeight, setFormatedHeight] = useState<string>("?")

  useEffect(() => {
    if (height) {
      const calculatedFeet = Math.floor(height / 12);
      const calculatedInches = height % 12;
      setFeet(calculatedFeet);
      setInches(calculatedInches);
      setFormatedHeight(`${calculatedFeet}'${calculatedInches}"`)
    }
  }, [height]);

  const formatDate = (isoDate: string): string => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatString = (input: string): string => {
    if (!input) return input;
  
    // Capitalize the first letter
    let formatted = input.charAt(0).toUpperCase() + input.slice(1);
  
    // Check if the string ends with a number and separate it with a space
    formatted = formatted.replace(/(\D)(\d+)$/, '$1 $2');
  
    return formatted;
  } 

  const formatWeight = (weight : number) => {
    if (!weight) return "";
    return `${weight} lbs`
  }

  const healthData = { dateOfBirth: formatDate(dateOfBirth), weight: formatWeight(weight), height: formatedHeight, sex: formatString(sex), diabetesType: formatString(diabetesType[0])};

  const toggleForm = () => {
    sethealthDataFormOpen(!healthDataFormOpen);
  }

  return (
    <div className="mt-3">
      {healthDataFormOpen ? (
        <HealthDataForm toggleForm={toggleForm} defaultValues={{dateOfBirth, weight: weight, feet, inches, sex: sex, diabetesType: diabetesType[0], email: email}} />
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
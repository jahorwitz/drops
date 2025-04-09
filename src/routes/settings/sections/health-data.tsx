import editIcon from "../../../images/Edit-Icon.png";
import { HealthDataForm } from "./health-data-form";
import { SectionWithEdit } from "../section-with-edit";
import { SectionList } from "../section-list";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../../hooks/useAuth";

const formatDate = (isoDate: string): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const formatLabel = (input: string): string => {
  if (!input) return input;

  // Capitalize the first letter
  let formatted = input.charAt(0).toUpperCase() + input.slice(1);

  // Check if the string ends with a number and separate it with a space
  formatted = formatted.replace(/(\D)(\d+)$/, "$1 $2");

  return formatted;
};

const formatWeight = (weight: number) => {
  if (!weight) return "";
  return `${weight} lbs`;
};

export const HealthData: React.FC = () => {
  const [healthDataFormOpen, sethealthDataFormOpen] = useState(false);
  const { currentUser } = useAuth();

  const [feet, setFeet] = useState<number>(999);
  const [inches, setInches] = useState<number>(999);
  const [formatedHeight, setFormatedHeight] = useState<string>("-");

  useEffect(() => {
    if (currentUser?.height) {
      const calculatedFeet = Math.floor(currentUser.height / 12);
      const calculatedInches = currentUser.height % 12;
      setFeet(calculatedFeet);
      setInches(calculatedInches);
      setFormatedHeight(`${calculatedFeet}'${calculatedInches}"`);
    }
  }, [currentUser]);

  const healthData = useMemo(() => {
    return {
      dateOfBirth: currentUser?.dateOfBirth
        ? formatDate(currentUser.dateOfBirth)
        : "-",
      weight: currentUser?.weight ? formatWeight(currentUser.weight) : "-",
      height: formatedHeight,
      sex: currentUser?.sex ? formatLabel(currentUser.sex) : "-",
      diabetesType:
        currentUser?.diabetesType && currentUser.diabetesType.length > 0
          ? formatLabel(currentUser.diabetesType[0])
          : "-",
    };
  }, [currentUser, formatedHeight]);

  const toggleForm = () => {
    sethealthDataFormOpen(!healthDataFormOpen);
  };

  return (
    <div className="mt-3">
      {currentUser && healthDataFormOpen ? (
        <HealthDataForm
          toggleForm={toggleForm}
          defaultValues={{
            dateOfBirth: currentUser.dateOfBirth,
            weight: currentUser.weight ? currentUser.weight.toString() : "",
            feet,
            inches,
            sex: currentUser.sex ?? "",
            diabetesType: currentUser.diabetesType?.[0] ?? "",
            email: currentUser.email ?? "",
          }}
        />
      ) : (
        <SectionWithEdit
          title="Health data"
          toggleForm={toggleForm}
          icon={editIcon}
        >
          {Object.keys(healthData).length === 0 ? (
            <p className="font-text text-sm opacity-60">
              No health data available
            </p>
          ) : (
            <SectionList list={healthData} />
          )}
        </SectionWithEdit>
      )}
    </div>
  );
};

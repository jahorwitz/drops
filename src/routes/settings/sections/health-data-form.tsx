import { useForm } from "react-hook-form";
import { Button, Form } from "../../../components";
import { SectionWithEdit } from "../section-with-edit";
import { useUserUpdate } from "../../../hooks/useUserUpdate";
import type { FieldErrors } from "react-hook-form";
import ExitIcon from "../../../images/Close-Icon.png";

interface DefaultValues {
  dateOfBirth?: string;
  weight: string;
  feet: number;
  inches: number;
  sex: string;
  diabetesType: string;
  email: string;
}

type Props = {
  toggleForm: () => void;
  defaultValues: DefaultValues;
}

export const HealthDataForm = ({ toggleForm, defaultValues }: Props) => {
  interface FormValues {
    dateOfBirth: string;
    weight: string;
    feet: number;
    inches: number;
    sex: string;
    diabetesType: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { handleUpdate } = useUserUpdate();

  const onSubmit = async (formData: FormValues) => {
    const { dateOfBirth, weight, feet, inches, sex, diabetesType } = formData;

    const updateData: Record<string, string | number> = { sex, diabetesType };

  // Process weight (if provided)
  if (weight && typeof weight === "string" && weight.trim()) {
    const parsedWeight = parseInt(weight, 10);
    if (!isNaN(parsedWeight)) {
      updateData.weight = parsedWeight;
    }
  }

  // Process height (if provided)
  if (feet && inches) {
    const feetValue = feet ? parseInt(feet as unknown as string, 10) : 0;
    const inchesValue = inches ? parseInt(inches as unknown as string, 10) : 0;

    updateData.height = feetValue * 12 + inchesValue;
    clearErrors("feet");
  } else {
    setError("feet", { type: "manual", message: "Please select a valid height." });
    return;
  }

   // Process dateOfBirth (if provided)
   if (dateOfBirth.trim()) {
    const dobMatch = dateOfBirth.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/);
    
    if (dobMatch) {
      // Convert dateOfBirth to YYYY-MM-DD format (string)
      const [month, day, year] = dateOfBirth.split("/");
      const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`).toISOString();
      updateData.dateOfBirth = formattedDate;
      clearErrors("dateOfBirth");
    } else {
      setError("dateOfBirth", { type: "manual", message: "Invalid date format. Use MM/DD/YYYY" });
      return;
    }
  }

  try {
    const response = await handleUpdate(defaultValues.email, updateData);
    const updatedUser = response?.data?.updateUser;

    if (updatedUser) {
      toggleForm();
    }
  } catch (error) {
    console.error("Failed to update health data:", error);
  }
};

const makeSelectRange = (range: number, unit: string) => {
  return Array.from({ length: range + 1 }, (_, i) => ({
    value: i.toString(),
    label: i.toString() + unit, 
  }));
}

  return (
    <SectionWithEdit title="Health data" toggleForm={toggleForm} icon={ExitIcon}>
      <Form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.TextInput
          labelText="Date of birth"
          placeholder="Enter your date of birth"
          type="text"
          feedback={errors.dateOfBirth?.message}
          filled={`${!watch("dateOfBirth") ? "filled" : ""}`}
          {...register("dateOfBirth")}
        />
        <Form.TextInput
          labelText="Weight (lbs)"
          placeholder="Enter your weight"
          type="text"
          feedback={errors.weight?.message}
          filled={`${!watch("weight") ? "filled" : ""}`}
          {...register("weight")}
        />
        <h3 className="font-text border-b-2 border-opacity-100">Height</h3>
        <div className="z-20 flex justify-around w-full gap-4">
          <Form.SelectForm
            labelText="Feet"
            placeholder="Select one"
            hintText="Select one option"
            options={makeSelectRange(8, "'")}
            value={defaultValues.feet.toString()} 
            feedback={errors as FieldErrors}
            {...register("feet")}
            className="flex-grow basis-1/2 min-w-[30px]"
          />
          <Form.SelectForm
            labelText="Inch"
            placeholder="Select one"
            hintText="Select one option"
            options={makeSelectRange(11, '"')}
            value={defaultValues.inches.toString()} 
            feedback={errors as FieldErrors}
            {...register("inches")}
            className="flex-grow basis-1/2 min-w-[30px]"
          />
        </div>
        <Form.SelectForm
        labelText="Sex"
        placeholder="Select one"
        hintText="Select one option"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
        value={defaultValues.sex} 
        feedback={errors as FieldErrors}
        {...register("sex")}
      />
        <Form.RadioGroup
          labelText="Choose your diabetes type"
          hintText="Select one option"
          options={[
            { value: "type2", label: "Type 2" },
            { value: "type1", label: "Type 1" },
            { value: "gestational", label: "Gestational" },
          ]}
          value={watch("diabetesType")} 
          feedback={errors as FieldErrors}
          {...register("diabetesType", {
            required: "This field is required",
          })}
        />
        <p className="font-text opacity-60">Your data is needed to provide correct pieces of advice</p>
        <Button
          type="submit"
          buttonText="Update health data"
          variant="primary"
          disabled={!isValid}
          className="h-[60px] w-full mt-1"
        />
      </Form>
    </SectionWithEdit>

  )
}
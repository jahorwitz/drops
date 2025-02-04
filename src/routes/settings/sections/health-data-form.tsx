import { useForm } from "react-hook-form";
import { Button, Form } from "../../../components";
import { SectionWithEdit } from "../section-with-edit";
import { useUserUpdate } from "../../../hooks/useUserUpdate";
import type { FieldErrors } from "react-hook-form";
import ExitIcon from "../../../images/Close-Icon.png";

interface DefaultValues {
  dateOfBirth?: string;
  weight: string;
  height: string;
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
    height: string;
    sex: string;
    diabetesType: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });

  const { handleUpdate } = useUserUpdate();

  const onSubmit = async (formData: FormValues) => {
    const { dateOfBirth, weight, height, sex, diabetesType } = formData;
    const updateData: Record<string, string> = {
      dateOfBirth,
      weight,
      height,
      sex,
      diabetesType,
    }

    try {
      const response = await handleUpdate(weight, updateData);
      const updatedUser = response?.data?.updateUser;

      if (updatedUser) {
        toggleForm();
      }
    } catch (error) {
      console.error('Failed to update health data:', error);
    }
  };

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
        <Form.TextInput
          labelText="Height (ft)"
          placeholder={`Enter your height in ft'in"`}
          type="text"
          feedback={errors.height?.message}
          filled={`${!watch("height") ? "filled" : ""}`}
          {...register("height")}
        />
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
        {...register("sex", {
          required: "This field is required",
        })}
      />
        <Form.RadioGroup
          labelText="Choose your diabetes type"
          hintText="Select one option"
          options={[
            { value: "type2", label: "Type 2" },
            { value: "type1", label: "Type 1" },
            { value: "gestational", label: "Gestational" },
          ]}
          defaultValue={defaultValues.diabetesType} 
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
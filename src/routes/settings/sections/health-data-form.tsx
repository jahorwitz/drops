import { useForm, Controller } from "react-hook-form";
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
};

export const HealthDataForm = ({ toggleForm, defaultValues }: Props) => {
  interface FormValues {
    dateOfBirth: string;
    weight: string;
    feet?: number | null;
    inches?: number | null;
    sex: string;
    diabetesType: string;
  }

  const {
    register,
    handleSubmit,
    control,
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

    const updateData: Record<string, string | number> = {
      dateOfBirth,
      sex,
      diabetesType,
    };

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
      const inchesValue = inches
        ? parseInt(inches as unknown as string, 10)
        : 0;

      updateData.height = feetValue * 12 + inchesValue;
      clearErrors("feet");
    } else {
      setError("feet", {
        type: "manual",
        message: "Please select a valid height.",
      });
      return;
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
  };

  return (
    <SectionWithEdit
      title="Health data"
      toggleForm={toggleForm}
      icon={ExitIcon}
    >
      <Form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Form.DatePicker
              {...field}
              value={value ? new Date(value) : null}
              onChange={onChange}
              labelText="Event Date"
              hintText="Enter a date in MM/DD/YYYY format"
              feedback={errors.dateOfBirth?.message}
              name="dateValue"
              className="w-full"
            />
          )}
        />
        <Form.TextInput
          labelText="Weight (lbs)"
          placeholder="Enter your weight"
          type="text"
          feedback={errors.weight?.message}
          filled={`${!watch("weight") ? "filled" : ""}`}
          {...register("weight")}
        />
        <div className="flex justify-around w-full gap-4 items-end">
          <Form.SelectForm
            labelText="Height"
            placeholder="Select one (ft)"
            hintText="Select one option"
            options={makeSelectRange(8, "' ft")}
            value={defaultValues.feet?.toString()}
            feedback={errors as FieldErrors}
            {...register("feet")}
            className="flex-grow basis-1/2 min-w-[30px]"
          />
          <Form.SelectForm
            placeholder="Select one (in)"
            hintText="Select one option"
            options={makeSelectRange(11, '" in')}
            value={defaultValues.inches?.toString()}
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
        <p className="font-text opacity-60">
          Your data is needed to provide correct pieces of advice
        </p>
        <Button
          type="submit"
          buttonText="Update health data"
          variant="primary"
          disabled={!isValid}
          className="h-[60px] w-full mt-1"
        />
      </Form>
    </SectionWithEdit>
  );
};

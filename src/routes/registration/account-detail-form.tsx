import React from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { Form } from "../../components/form";
import { Button } from "../../components";

interface Props {
  defaultValues?: FormValues;
}

interface FormValues {
  dateOfBirth: Date | null;
  weight: string;
  feet?: number | null;
  inches?: number | null;
  sex: string;
  diabetesType: string;
}

export const AccountDetailForm: React.FC<Props> = ({
  defaultValues,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const makeSelectRange = (range: number, unit: string) => {
    return Array.from({ length: range + 1 }, (_, i) => ({
      value: i.toString(),
      label: i.toString() + unit,
    }));
  };

  return (
    <div className="px-4 bg-lightGray h-[100vh] flex">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-pageContent m-auto"
      >
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
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <Form.DatePicker
              {...field}
              {...register("dateOfBirth", {
                required: "This field is required",
              })}
              value={value}
              onChange={onChange}
              labelText="Date of birth"
              hintText="Enter a date in MM/DD/YYYY format"
              feedback={errors.dateOfBirth?.message}
              name="dateValue"
              className="w-full"
            />
          )}
        />
        <Form.SelectForm
          labelText="Sex"
          placeholder="Choose"
          hintText="Select one option"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          feedback={errors as FieldErrors}
          {...register("sex")}
        />
        <Form.TextInput
          labelText="Weight (lbs)"
          placeholder="Enter your weight"
          type="text"
          feedback={errors.weight?.message}
          filled={`${!watch("weight") ? "filled" : ""}`}
          {...register("weight")}
        />
        <div className="flex justify-around w-full gap-5 items-end ">
          <Form.SelectForm
            labelText="Height"
            placeholder="Select one (ft)"
            hintText="Select one option"
            options={makeSelectRange(8, "' ft")}
            value={defaultValues?.feet?.toString()}
            feedback={errors as FieldErrors}
            {...register("feet")}
            className="w-full"
          />
          <Form.SelectForm
            placeholder="Select one (in)"
            hintText="Select one option"
            options={makeSelectRange(11, '" in')}
            value={defaultValues?.inches?.toString()}
            feedback={errors as FieldErrors}
            {...register("inches")}
            className="w-full"
          />
        </div>
        <p className="font-text opacity-60">
          Your data is needed to provide correct pieces of advice
        </p>
        <Button
          type="submit"
          buttonText="Register"
          variant="primary"
          disabled={!isValid}
          className="h-[60px] w-full mt-1"
        />
      </Form>
    </div>
  );
};

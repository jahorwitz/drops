import React from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { Form } from "../../components/form";
import { Button } from "../../components";

 /*interface FormValues {
  diabetesType: string;
  dateOfBirth: Date;
  weight: string;
  feet: number;
  inches: number;
  sex: string;
} 

interface DefaultValues {
  dateOfBirth: Date;
  weight: string;
  feet: number;
  inches: number;
  sex: string;
  diabetesType: string;
} */




export const AccountDetailForm: React.FC = (defaultValues) => {

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
    formState: { errors, isValid },
  } = useForm<FormValues>({ defaultValues,
    mode: "onChange",});

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  const makeSelectRange = (range: number, unit: string) => {
    return Array.from({ length: range + 1 }, (_, i) => ({
      value: i.toString(),
      label: i.toString() + unit, 
    }));
  }

  return (
    <div className="pl-4 pr-4">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 bg-lightGrey"
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
              value={value}
              onChange={onChange}
              labelText="Date of birth"
              hintText="Enter a date in MM/DD/YYYY format"
              feedback={errors.dateOfBirth?.message}
              {...register("dateOfBirth", {
                required: "This field is required",
              })}
              name="dateValue"
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
        <div className="z-20 flex justify-around w-full gap-5 items-end ">
          <Form.SelectForm
            labelText="Height"
            placeholder="Select one (ft)"
            hintText="Select one option"
            options={makeSelectRange(8, "' ft")}
            value={defaultValues.feet?.toString()} 
            feedback={errors as FieldErrors}
            {...register("feet")}
            className="flex-grow basis-1/2 min-w-full"
          />
          <Form.SelectForm
            placeholder="Select one (in)"
            hintText="Select one option"
            options={makeSelectRange(11, '" in')}
            value={defaultValues.inches?.toString()} 
            feedback={errors as FieldErrors}
            {...register("inches")}
            className="flex-grow basis-1/2 min-w-full"/* fill space, may be min width issue*/
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

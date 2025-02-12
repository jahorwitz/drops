import React from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { Form } from "../../components/form";

interface FormValues {
  diabetesType: string;
  dateValue: Date | null;
  weight: string;
  height: string;
  sex: string;
}


export const AccountDetailForm: React.FC = () => {
    const {
      register,
      handleSubmit,
      control,
      watch,
      formState: { errors },
    } = useForm<FormValues>();
  
    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data, null, 2));
    };
  
    return (
       <div className="pl-4 pr-4">
      <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-lightGrey">
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
        name="dateValue"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Form.DatePicker
            {...field}
            value={value}
            onChange={onChange}
            labelText="Date of birth"
            hintText="Enter a date in MM/DD/YYYY format"
            feedback={errors.dateValue?.message}
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
        {...register("sex", {
          required: "This field is required",
        })}
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
        <p className="font-text opacity-60">Your data is needed to provide correct pieces of advice</p>
      </Form>
      </div>
    );
  };


import React from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { Form } from "../../components/form";
import { Button, SimpleContainer } from "../../components";
import { useUserUpdate } from "../../hooks/useUserUpdate";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import backButton from "../../images/Backbutton.svg";
import { useNavigate } from "react-router-dom";

interface Props {
  defaultValues?: FormValues;
}

interface FormValues {
  dateOfBirth: Date | null;
  weight: number;
  feet?: number | null;
  inches?: number | null;
  sex: string;
  diabetesType: string;
}

export const AccountDetailForm: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { handleAuthorization, handleUpdate } = useUserUpdate();

  const stored = localStorage.getItem("accountDetailFormValues");
  const defaultValues = stored ? JSON.parse(stored) : undefined;
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


  // Watch and store the form values incase of user refresh
  const watchedValues = watch();
  React.useEffect(() => {
    localStorage.setItem("accountDetailFormValues", JSON.stringify(watchedValues));
  }, [watchedValues]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      // Get email and password from localStorage
      const stored = JSON.parse(localStorage.getItem("accountCredentials") || "{}");
      const { email, password } = stored;

      if (!email || !password) {
        console.error("Missing email or password from localStorage.");
        return;
      }

      // Check if user is authorized
      const authorized = await handleAuthorization(email, password);
      if (!authorized) {
        console.error("User not authorized.");
        return;
      }

      // Convert weight to number
      const weight = Number(data.weight);
      if (isNaN(weight)) {
        console.error("Weight is not a valid number.");
        return;
      }

      // Convert feet + inches into total height in inches
      const feet = Number(data.feet) || 0;
      const inches = Number(data.inches) || 0;
      const height = feet * 12 + inches;

      // Update user
      const payload = {
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        weight,
        height,
        diabetesType: data.diabetesType,
        isRegistrationComplete: true,
      };
      const response = await handleUpdate(email, payload);

      console.log("User updated successfully:", response.data);
      localStorage.removeItem("accountDetailFormValues");
      localStorage.removeItem("registrationStep");
      localStorage.removeItem("accountCredentials");
      navigate("/registration-confirm");
    } catch (err) {
      console.error("Failed to submit form:", err);
    }
  };


  const makeSelectRange = (range: number, unit: string) => {
    return Array.from({ length: range + 1 }, (_, i) => ({
      value: i.toString(),
      label: i.toString() + unit,
    }));
  };

  return (
    <SimpleContainer>
      <div className="w-full px-4 mb-5">
        <Link to="/welcome">
          <img src={backButton} alt="backButton" />
        </Link>  
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="logo" />
          <div className="text-center">
            <h2 className="text-[32px] font-medium text-[#121212] leading-[120%]">Registration</h2>
            <p className="text-[#121212] opacity-60">Step 2/2</p>
          </div>
        </div>
      </div>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 gap-4 max-w-pageContent m-auto"
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
          {...register("sex", { required: "Sex is required" })}
        />
        <Form.TextInput
          labelText="Weight (lbs)"
          placeholder="Enter your weight"
          type="text"
          feedback={errors.weight?.message}
          filled={`${!watch("weight") ? "filled" : ""}`}
          {...register("weight", { required: "Weight is required" })}
        />
        <div className="flex justify-around w-full gap-5 items-end">
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
    </SimpleContainer>
  );
};

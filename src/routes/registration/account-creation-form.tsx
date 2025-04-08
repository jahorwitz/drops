import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../../components/form";
import { Button } from "../../components";

type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const AccountCreationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({ mode: "onChange" });

  // Watch password field for validation
  const password = watch("password", "");

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data submitted:", data);
    // Perform form submission logic here
  };

  return (
    <div className="px-4 bg-lightGray h-[100vh] flex">
      <Form
        className="flex flex-col gap-4 max-w-pageContent m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.TextInput
          labelText="Name"
          type="text"
          minLength={3}
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
          feedback={errors.name?.message}
        />
        <Form.TextInput
          labelText="Email"
          type="email"
          placeholder="Enter your email address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid",
            },
          })}
          feedback={errors.email?.message}
        />
        <Form.TextInput
          labelText="Password"
          type="password"
          placeholder="Create a password"
          hintText="Password should be at least 8 characters long and contain numbers & letters"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
              message:
                "Password must contain at least one letter and one number",
            },
          })}
          feedback={errors.password?.message}
        />
        <Form.TextInput
          labelText="Repeat Password"
          type="password"
          placeholder="Repeat your password"
          {...register("repeatPassword", {
            required: "Please repeat your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          feedback={errors.repeatPassword?.message}
        />
        <Button
          type="submit"
          buttonText="Continue"
          variant="primary"
          disabled={!isValid}
          className="h-[60px] w-full mt-24 mb-8"
        />
      </Form>
    </div>
  );
};

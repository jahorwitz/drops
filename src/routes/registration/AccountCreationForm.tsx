import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../../components/form";
import { Button } from "../../components/button";

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
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  // Watch password field for validation
  const password = watch("password", "");

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data submitted:", data);
    // Perform form submission logic here
  };

  return (
    <div className="pl-4 pr-4 bg-[#F5F5F5]">
      <Form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.TextInput
          labelText="Name"
          type="text"
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
          })}
          feedback={errors.password?.message}
        />
        <Form.TextInput
          labelText="Repeat Password"
          type="password"
          placeholder="Repeat your password"
          {...register("repeatPassword", {
            required: "Please repeat your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          feedback={errors.repeatPassword?.message}
        />
        <Button
          className="mt-[103px]"
          buttonText="Continue"
          type="submit"
        />
      </Form>
    </div>
  );
};

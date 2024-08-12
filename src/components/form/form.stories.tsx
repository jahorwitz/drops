import { useForm, Controller } from "react-hook-form";
import { Form } from "./form";
import { Button } from "../button";

export default {
  title: "Form",
  component: Form,
};

interface CreationFormValues {
  nameField: string;
  emailField: string;
  passwordField: string;
  confirmPasswordField: string;
}

export const AccountCreationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreationFormValues>();

  const onSubmit = (data: CreationFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  max-w-md justify-center m-auto gap-4"
    >
      <Form.AccountCreationForm
        labelText="Name"
        placeholder="Enter your name"
        feedback={errors.nameField?.message}
        {...register("nameField", {
          required: "Must be at least 3 characters long",
          minLength: {
            value: 3,
            message: "This field must be at least 3 characters long",
          },
        })}
      />
      <Form.AccountCreationForm
        labelText="Email"
        type="email"
        placeholder="Enter your email"
        feedback={errors.emailField?.message}
        {...register("emailField", {
          required: "Email is required",

          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email must be a valid email address",
          },
        })}
      />

      <Form.AccountCreationForm
        labelText="Password"
        type="password"
        placeholder="Create a password"
        hintText="Password must be at least 8 characters and contain at least one letter and at least one number"
        feedback={errors.passwordField?.message}
        {...register("passwordField", {
          required: "Password is required",
          minLength: {
            value: 8,
            message:
              "Password must be at least 8 characters and contain at least one letter and at least one number",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "Password must be at least 8 characters and contain at least one letter and at least one number",
          },
        })}
      />

      <Form.AccountCreationForm
        labelText="Repeat password"
        placeholder="Repeat your password"
        type="password"
        feedback={errors.confirmPasswordField?.message}
        {...register("passwordField", {
          required: "Password is required",
          minLength: {
            value: 8,
            message:
              "Password must be at least 8 characters and contain at least one letter and at least one number",
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message:
              "Password must be at least 8 characters and contain at least one letter and at least one number",
          },
        })}
      />

      <Button buttonText="Continue" type="submit">
        Submit
      </Button>
    </Form>
  );
};

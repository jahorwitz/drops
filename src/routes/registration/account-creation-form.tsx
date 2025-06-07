import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../../components/form";
import { Button, SimpleContainer } from "../../components";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations/users";
import { useStepWizard } from "../../hooks/useStepWizard";
import logo from "../../images/Logo.svg";
import backButton from "../../images/Backbutton.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


type FormValues = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const AccountCreationForm: React.FC = () => {
  const [createUser] = useMutation(CREATE_USER);
  const { goToNextStep } = useStepWizard();
  const { login } = useAuth();

  const stored = localStorage.getItem("accountFormValues");
  const defaultValues = stored ? JSON.parse(stored) : undefined;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormValues>({defaultValues, mode: "onChange" });

  

  // Watch and store the form values incase of user refresh
  const watchedValues = watch();
  const password = watchedValues.password || "";
  React.useEffect(() => {
  localStorage.setItem("accountFormValues", JSON.stringify(watchedValues));
}, [watchedValues]);


  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async ({name, email, password}) => {
    try {
      // Create user
      const response = await createUser({
        variables: {
          data: {
            name,
            email,
            password,
          },
        },
      });
      
      if (!response?.data?.createUser) throw new Error("Failed to create user");

      // 2. Log in via useAuth
      login({ email, password });

      // 3. Store email for step 2
      localStorage.setItem("accountEmail", JSON.stringify({ email }));
      localStorage.removeItem("accountFormValues");
      
      // 4. Go to next step
      goToNextStep()
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <SimpleContainer>
      <div className="w-full px-4">
        <Link to="/welcome">
          <img src={backButton} alt="backButton" />
        </Link>
        <div className="flex flex-col items-center justify-center">
          <img src={logo} alt="logo" />
          <div className="text-center">
            <h2 className="text-[32px] font-medium text-[#121212] line-height-[120%] ">Registration</h2>
            <p className="text-[#121212] text-opacity-[0.6] ">Step 1/2</p>
          </div>
        </div>
      </div>
      <Form
        className="flex flex-col px-4 gap-4 max-w-pageContent m-auto"
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
          hintText="Password should be at least 10 characters long and contain numbers & letters"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
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
    </SimpleContainer>
  );
};

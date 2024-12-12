import { useForm } from "react-hook-form";
import { Button, Form } from "../../../components";
import { SectionWithEdit } from "../section-with-edit";
import { useUserUpdate } from "../../../hooks/useUserUpdate";
import ExitIcon from "../../../images/Close-Icon.png";

interface DefaultValues {
  name: string;
  email: string;
}

type Props = {
  toggleForm: () => void;
  defaultValues: DefaultValues;
  onSuccess: (updatedUser: { name: string; email: string }) => void;
}

export const CredentialsForm = ({toggleForm, defaultValues, onSuccess,} : Props) => {
  interface FormValues {
    name: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmedPassword: string;
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

  const newPassword = watch("newPassword");
  
  const { handleUpdate, handleAuthorization } = useUserUpdate();

  const onSubmit = async (formData: FormValues) => {
    const { name, email, oldPassword, newPassword } = formData;

    const updateData: Record<string, string> = {
      name,
      email,
    }

    if (newPassword) {
      updateData.password = newPassword
    }

    try {
      const isAuthorized = await handleAuthorization(defaultValues.email, oldPassword);
      if (!isAuthorized) {
        alert('Incorrect old password. Please try again.');
        return;
      }

      const response = await handleUpdate(defaultValues.email, updateData);
      const updatedUser = response?.data?.updateUser;

      if (updatedUser?.name && updatedUser.email) {
        onSuccess({ name: updatedUser.name, email: updatedUser.email });
        toggleForm();
      }
    } catch (error) {
      console.error('Failed to update credentials:', error);
    }
  };
  
  return (
    <SectionWithEdit title="Credentials" toggleForm={toggleForm} icon={ExitIcon}>
      <Form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.TextInput
          labelText="Name"
          placeholder="Enter your name"
          type="text"
          feedback={errors.name?.message}
          filled={`${!watch("name") ? "filled" : ""}`}
          {...register("name", {
            required: "This field is required",
          })}
        />
        <Form.TextInput
          labelText="Email"
          placeholder="Enter your email"
          type="text"
          feedback={errors.email?.message}
          filled={`${!watch("email") ? "filled" : ""}`}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        <Form.TextInput
          labelText="Old password"
          placeholder="Enter your old password"
          type="password"
          feedback={errors.oldPassword?.message}
          filled={`${!watch("oldPassword") ? "filled" : ""}`}
          {...register("oldPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <Form.TextInput
          labelText="New password"
          placeholder="Enter your new password"
          type="password"
          feedback={errors.newPassword?.message}
          filled={`${!watch("newPassword") ? "filled" : ""}`}
          {...register("newPassword", {
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <Form.TextInput
          labelText="Confirm new password"
          placeholder="Confirm your new password"
          type="password"
          feedback={errors.confirmedPassword?.message}
          filled={`${!watch("confirmedPassword") ? "filled" : ""}`}
          {...register("confirmedPassword", {
            validate: (value) =>
              value === newPassword || "Passwords do not match",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <Button
          type="submit"
          buttonText="Update credentials"
          variant="primary"
          disabled={!isValid}
          className="h-[60px] w-full mt-1"
        />
      </Form>
    </SectionWithEdit>

  )
}
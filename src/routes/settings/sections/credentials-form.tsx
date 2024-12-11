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
}

export const CredentialsForm = ({toggleForm, defaultValues} : Props) => {
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
  });

  const { handleUpdate } = useUserUpdate();

  const onSubmit = async (formData: FormValues) => {
    const { name, email, newPassword } = formData;
    const updateData: Record<string, string> = {
      name,
      email,
    }

    if (newPassword) {
      updateData.password = newPassword
    }

    try {
    await handleUpdate(defaultValues.email, updateData);

    toggleForm();
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
          placeholder="Enter your Confirm your new password"
          type="password"
          feedback={errors.confirmedPassword?.message}
          filled={`${!watch("confirmedPassword") ? "filled" : ""}`}
          {...register("confirmedPassword", {
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
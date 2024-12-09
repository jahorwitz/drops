import { useForm } from "react-hook-form";
import { Button, Form } from "../../../components";
import { SectionWithEdit } from "../section-with-edit";
import ExitIcon from "../../../images/Close-Icon.png";

interface DefaultValues {
  Name: string;
  Email: string;
}

type Props = {
  toggleForm: () => void;
  defaultValues: DefaultValues;
}

export const CredentialsForm = ({toggleForm, defaultValues} : Props) => {
  interface FormValues {
    Name: string;
    Email: string;
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

  const onSubmit = (formData: FormValues) => {
    console.log(formData);
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
          feedback={errors.Name?.message}
          filled={`${!watch("Name") ? "filled" : ""}`}
          {...register("Name", {
            required: "This field is required",
          })}
        />
        <Form.TextInput
          labelText="Email"
          placeholder="Enter your email"
          type="text"
          feedback={errors.Email?.message}
          filled={`${!watch("Email") ? "filled" : ""}`}
          {...register("Email", {
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
          type="text"
          feedback={errors.oldPassword?.message}
          filled={`${!watch("oldPassword") ? "filled" : ""}`}
          {...register("oldPassword", {
            required: "This field is required",
          })}
        />
        <Form.TextInput
          labelText="New password"
          placeholder="Enter your new password"
          type="text"
          feedback={errors.newPassword?.message}
          filled={`${!watch("newPassword") ? "filled" : ""}`}
          {...register("newPassword", {
            required: "This field is required",
          })}
        />
        <Form.TextInput
          labelText="Confirm new password"
          placeholder="Enter your Confirm your new password"
          type="text"
          feedback={errors.confirmedPassword?.message}
          filled={`${!watch("confirmedPassword") ? "filled" : ""}`}
          {...register("confirmedPassword", {
            required: "This field is required",
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
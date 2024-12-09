import { useForm } from "react-hook-form";
import { Button, Form } from "../../../components";
import { SectionWithEdit } from "../section-with-edit";
import ExitIcon from "../../../images/Close-Icon.png";

type Props = {
  toggleForm: () => void;
  defaultValues: object;
}

export const CredentialsForm = ({toggleForm, defaultValues} : Props) => {
  interface FormValues {
    name: string;
    email: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>();

  const onSubmit = (formData: FormValues) => {
    console.log(formData);
  };
  console.log(defaultValues);
  
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
          value={defaultValues?.Name}
          feedback={errors.name?.message}
          filled={`${!watch("name") ? "filled" : ""}`}
          {...register("name", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid name",
            },
          })}
        />
        <Form.TextInput
          labelText="Email"
          placeholder="Enter your email"
          type="text"
          value={defaultValues?.Email}
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
          type="text"
          feedback={errors.password?.message}
          filled={`${!watch("password") ? "filled" : ""}`}
          {...register("password", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid password",
            },
          })}
        />
        <Form.TextInput
          labelText="New password"
          placeholder="Enter your new password"
          type="text"
          feedback={errors.password?.message}
          filled={`${!watch("password") ? "filled" : ""}`}
          {...register("password", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid password",
            },
          })}
        />
        <Form.TextInput
          labelText="Confirm new password"
          placeholder="Enter your Confirm your new password"
          type="text"
          feedback={errors.password?.message}
          filled={`${!watch("password") ? "filled" : ""}`}
          {...register("password", {
            required: "This field is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid password",
            },
          })}
        />
        <Button
          type="submit"
          buttonText="Update credentials"
          variant="primary"
          disabled={!isValid}
          className="h-[60px] w-full"
        />
      </Form>
    </SectionWithEdit>

  )
}
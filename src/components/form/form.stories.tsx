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

interface MyFormValues {
  myTextField: string;
  anotherTextField: string;
  anEnumField: "one" | "two" | "three";
}

interface NumericInputFormValues {
  numericField: number;
}

interface WeekdayFormValues {
  exersiceDays: string[];
  taskDays: string[];
}

interface FormValues {
  optionName: string;
}

interface TimePicker {
  timeValue: string;
}

export const WithTextInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFormValues>();
  const onSubmit = (data: MyFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Form.TextInput
        labelText="My Text Field"
        hintText="Must be at least 5 characters long"
        feedback={errors.myTextField?.message}
        {...register("myTextField", {
          required: "This field is required",
          minLength: {
            value: 5,
            message: "This field must be at least 5 characters long",
          },
        })}
      />
      <Form.TextInput
        labelText="Another Text Field"
        placeholder="Must be 'foo'"
        feedback={errors.anotherTextField?.message}
        {...register("anotherTextField", {
          required: "This field is required",
          validate: (value) => value === "foo" || "This field must be 'foo'",
        })}
      />
      <Form.TextInput
        labelText="'one' or 'two' or 'three'"
        feedback={errors.anEnumField?.message}
        {...register("anEnumField", {
          required: "This field is required",
          validate: (value) =>
            ["one", "two", "three"].includes(value) ||
            "This field must be 'one' or 'two' or 'three'",
        })}
      />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const WithWeekdays = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeekdayFormValues>();

  const onSubmit = (data: WeekdayFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Form.Weekday
        {...register("exersiceDays", {
          required: "This field is required",
          validate: (value) => value.length > 0,
        })}
        labelText="Exercise days"
        hintText="Here is a hint"
        feedback={errors.exersiceDays?.message}
      />
      <Form.Weekday
        {...register("taskDays", {
          required: "This field is required",
          validate: (value) => value.length > 0,
        })}
        labelText="Days of this task"
        hintText=""
        feedback={errors.taskDays?.message}
      />

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const WithRadioGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Form.RadioGroup
        labelText="My Radio Group"
        hintText="Select one option"
        options={[
          { value: "one", label: "Option 1" },
          { value: "two", label: "Option 2" },
          { value: "three", label: "Option 3" },
        ]}
        feedback={errors}
        {...register("optionName" as keyof FormValues, {
          required: "This field is required",
        })}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const WithNumericInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NumericInputFormValues>();

  const onSubmit = (data: NumericInputFormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Form.NumericInput
        {...register("numericField", {
          validate: (value) =>
            value
              ? value >= 3 || "This field must be greater than or equal to 3"
              : "This field is required",
        })}
        labelText="Meals per day"
        hintText="3 is a recommended amount"
        feedback={errors.numericField?.message}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const TimePicker = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimePicker>();

  const onSubmit = (data: TimePicker) => {
    alert(JSON.stringify(data, null, 2));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="timeValue"
        control={control}
        render={({ field }) => (
          <>
            <Form.TimePicker
              {...field}
              {...register("timeValue", {
                required: "Time value is required",
                pattern: {
                  value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                  message: "Invalid time format. Please use hh:mm:AM/PM",
                },
              })}
              labelText="Reminder 1"
              hintText="Choose a time"
              setValue={(name, value) =>
                field.onChange({ target: { name, value } })
              }
              feedback={errors.timeValue?.message}
            />
          </>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

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
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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


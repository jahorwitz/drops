import { useForm } from "react-hook-form";
import { Form } from "./form";
import { RadioGroup } from "./radio-group";

export default {
  title: "Form",
  component: Form,
};

interface MyFormValues {
  myTextField: string;
  anotherTextField: string;
  anEnumField: "one" | "two" | "three";
}


interface WeekdayFormValues {
  exersiceDays: string[];
  taskDays: string[];
}


interface FormValues {
  optionName: string;
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

      {/* Replace with Submit button once button is finished */}
      <button type="submit" className="bg-darkYellow p-4 rounded">
        Submit
      </button>
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

      {/* Replace with Submit button once button is finished */}
      <button type="submit" className="bg-darkYellow p-4 rounded">
        Submit
      </button>
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
      <RadioGroup
        labelText="My Radio Group"
        options={[
          { value: "one", label: "Option 1" },
          { value: "two", label: "Option 2" },
          { value: "three", label: "Option 3" },
        ]}
        feedback={errors.optionName?.message}
        {...register("optionName", {
          required: "This field is required",
        })}
      />
      {/* Replace with Submit button once button is finished */}
    </Form>
  );
};
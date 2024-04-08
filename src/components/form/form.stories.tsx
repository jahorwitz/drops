import { useForm } from "react-hook-form";
import { Form } from "./form";

export default {
  title: "Form",
  component: Form,
};

interface MyFormValues {
  myTextField: string;
  anotherTextField: string;
  anEnumField: "one" | "two" | "three";
}

interface TimePickerValues {
  hours: string;
  minutes: string;
  timePeriod: string;
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

export const WithTimePicker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimePickerValues>();

  const onSubmit = (data: TimePickerValues) => {
    alert(JSON.stringify(data, null, 2));
  };


return (
  <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
    <Form.TimePicker
     labelText="Reminder 1"
     hintText="Here is a hint"
      feedback={errors.hours?.message || errors.minutes?.message || errors.timePeriod?.message}
      {...register("hours", {
        required: true,
        pattern: /^(0?[0-9]|1[0-2])$/,
        min: 0,
        max: 12,
        })}
        {...register("minutes", {
          required: true,
          min: 0.0,
          max: 59,
          pattern: /^(0?[0-9]|[1-5][0-9]|60)$/,
        })}
        {...register("timePeriod", {
         required: true,
         pattern: /^(AM|PM)$/i, 
          })}
       
      />
  </Form>
);
};
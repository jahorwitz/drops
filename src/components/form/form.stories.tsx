import { useForm, Controller } from "react-hook-form";
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
  time: string;  
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

// Define the story function
export const TimePickerStory = () => {
  // Use useForm hook to manage form state
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TimePickerValues>();
 
  const onSubmit = (data: TimePickerValues) => {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
    
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Render the Controller component with TimePicker as the "as" prop */}
      <Controller
        name="time"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
          {field.value}
             <Form.TimePicker
            {...field}
            labelText="Select Time"
            hintText="Choose a time"
            feedback={errors.time?.message}
            {...register('time')} 
          />
          </>
          
        )}
      />
      <button  className="bg-darkYellow p-4 rounded" type="submit">Submit</button>
  
    </Form>
  );
};

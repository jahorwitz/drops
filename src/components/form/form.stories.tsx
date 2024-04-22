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

interface TimePicker {
  timeValue: string;
  //   hours: string;
  //   minutes: string;
  //   period: "AM" | "PM";
  // };
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
            labelText="Reminder 1"
            hintText="Choose a time"
            setValue={(name, value) => field.onChange({ target: { name, value } })}
            feedback={errors.timeValue?.message}
            {...register('timeValue')}

          />
          </>
          
        )} 

      />

      
      <button  className="bg-darkYellow p-4 rounded" type="submit">Submit</button>
    </Form>
  
  );
};











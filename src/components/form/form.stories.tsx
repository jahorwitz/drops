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
  Time: string;
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

//Story for TimePicker component
export const TimePickerStory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimePickerValues>();

  // Submit function
  const onSubmit = (data: TimePickerValues) => {
    alert(JSON.stringify(data, null, 2));

  };

  // const [time, setTime] = useState<string>('');

  // const handleTimeChange = (value: string) => {
  //   console.log('Combined Time:', value);
  // };
  // const timeValue = watch("Time");

  //  // Function to handle change in time value
  //  const handleTimeChange = (hour: string, minute: string, period: string) => {
  //   const value = `${hour}:${minute} ${period}`;
  //   console.log("Selected Time:", value);
  // };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Form.TimePicker
        labelText="Reminder 1"
        hintText="select a time"
        feedback={errors.Time?.message}
        {...register('Time', {
          required: 'Time is required',
         
        })}
      />
      <button type="submit" className="bg-darkYellow p-4 rounded">
        Submit
      </button>
    </Form>
  );
};



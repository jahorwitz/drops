import { useForm, Controller } from "react-hook-form";
import { Form } from "./form";
import { Button } from "../button";
import type { FieldErrors } from "react-hook-form";

export default {
  title: "Form",
  component: Form,
};

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
  sex: string;
}

interface TimePicker {
  timeValue: string;
}

interface DatePickerValues {
  dateValue: Date | null;
}

export const WithTextInputs = () => {
  const {
    register,
    handleSubmit,
    watch,
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
        filled={`${!watch("myTextField") ? "filled" : ""}`}
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
        filled={`${!watch("anotherTextField") ? "filled" : ""}`}
        {...register("anotherTextField", {
          required: "This field is required",
          validate: (value) => value === "foo" || "This field must be 'foo'",
        })}
      />
      <Form.TextInput
        labelText="'one' or 'two' or 'three'"
        feedback={errors.anEnumField?.message}
        filled={`${!watch("anEnumField") ? "filled" : ""}`}
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
        feedback={errors as FieldErrors}
        {...register("optionName", {
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

export const DatePicker = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DatePickerValues>();

  const onSubmit = (data: DatePickerValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="dateValue"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Form.DatePicker
            {...field}
            value={value}
            onChange={onChange}
            labelText="Event Date"
            hintText="Enter a date in MM/DD/YYYY format"
            feedback={errors.dateValue?.message}
            name="dateValue"
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const WithAddMoreSection = () => {
  const { handleSubmit } = useForm<TimePicker>();

  const onSubmit = (data: TimePicker) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Form.AddMoreSection buttonText="+ Add another reminder">
        <Form.ListTimeInput label="reminder" varient2Text="Meal" />
      </Form.AddMoreSection>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export const SelectForm = () => {
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
      <Form.SelectForm
        labelText="Sex"
        placeholder="Select one"
        hintText="Select one option"
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
        feedback={errors as FieldErrors}
        {...register("sex", {
          required: "This field is required",
        })}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

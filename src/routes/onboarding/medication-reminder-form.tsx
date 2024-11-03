import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components"

export const MedicationReminderForm: React.FC = () => {
  interface FormValues {
    medication: string;
  }

  const {
    register,
    formState: {errors},
  } = useForm<FormValues>();

  return (
    <div>
      <h2>Medication Reminders</h2>
      <Form>
        <Form.TextInput 
        labelText=""
        placeholder=""
        type="text"
        feedback={errors.medication?.message}
        {...register("medication", {
          required: "This field is required",
        })}
        />
        <Form.AddMorebutton buttonText="+ Add more reminders" />
      </Form>
    </div>
  )
}
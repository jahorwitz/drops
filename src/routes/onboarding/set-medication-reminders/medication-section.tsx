import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "../../../components"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { MedicationTimeInput } from "./medication-time-input";

interface Props {
  index?: number;
}

export const MedicationSection: React.FC<Props> = ({ index }) =>  {
  interface FormValues {
    medication1: string;
    reminder1: string;
  }

  const {
    register,
    formState: {errors},
  } = useForm<FormValues>();

  return (
    <div>
          <div>
            <h3>Medication {index}</h3>
            <Button
              variant="icon"
              icon={faTrashCan}
              onClick={() => alert("I'm an icon button")}
            />
          </div>
          <Form.TextInput 
          labelText="Medication name & amount"
          placeholder="Medication name & amount"
          type="text"
          feedback={errors.medication1?.message}
          {...register("medication1", {
            required: "This field is required",
          })}
          />
          <MedicationTimeInput index={1} />
        <Button
            variant="icon"
            icon={faTrashCan}
            onClick={() => alert("I'm an icon button")}
          />
          <Form.AddMorebutton buttonText="+ Add more reminders">
            <MedicationTimeInput />
          </Form.AddMorebutton>
        </div>
  )
}
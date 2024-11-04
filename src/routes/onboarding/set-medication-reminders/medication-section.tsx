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
    <div className="bg-white mx-auto min-w-[315px] max-w-[400px] px-4 py-3 w-full rounded-[16px]">
          <div className="flex items-center ">
            <h3 className="text-base leading-[19px] font-text mb-1">Medication {index}</h3>
            <Button
              variant="icon"
              icon={faTrashCan}
              className="ml-auto"
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
          <Form.AddMorebutton buttonText="+ Add more reminders">
            <MedicationTimeInput />
          </Form.AddMorebutton>
        </div>
  )
}
import React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { Form } from "../../../components";
import { Button } from "../../../components";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface Props {
    index?: number;
    onDelete?: (index:number) => void;
    elementId?: number;
}

export const SetExerciseGoals: React.FC<Props> = ({
    index, onDelete, elementId }) => {
    const {
        register,
        unregister,
        formState: {errors},
    } = useForm();

    const inputName = `Exercise${elementId}` || "Exercise1"

    const reminderOptions = [
        { value: "60", label: "1min before" },
        { value: "300", label: "5min before" },
        { value: "600", label: "10min before" },
        { value: "900", label: "15min before" },
        { value: "1800", label: "30min before" },
        { value: "3600", label: "1hr before" },
    ]

    return (
        <div>
            <div>
                <h3>Exercise {index}</h3>
                <Button 
                variant="icon"
                icon={faTrashCan}
                className="ml-auto"
                onClick={() => {
                    if (onDelete && elementId) {
                        onDelete(elementId)
                        unregister(inputName)
                    }
                }}
                />
                <Form.TextInput 
                labelText="Name"
                placeholder="Enter name"
                type="text"
                feedback={errors[inputName]?.message as string | undefined}
                {...register(inputName, {
                    required: "This field is required"
                })}
                />
                <Form.Weekday 
                labelText="Days to exercise"
                feedback={errors[inputName]?.message as string | undefined}
                {...register(inputName, {
                    required: "This field is required"
                })}
                />
                <Form.TextInput 
                labelText="Time"
                placeholder="Enter time"
                type="text"
                feedback={errors[inputName]?.message as string | undefined}
                {...register(inputName, {
                    required: "This field is required"
                })}
                />
                <Form.TextInput 
                labelText="Duration (min)"
                placeholder="Enter duration"
                type="text"
                feedback={errors[inputName]?.message as string | undefined}
                {...register(inputName, {
                    required: "This field is required"
                })}
                />
                <Form.SelectForm 
                labelText="Reminder"
                placeholder="When to remind of the exercise?"
                type="text"
                options={reminderOptions}
                feedback={errors[inputName]?.message as FieldErrors | undefined}
                {...register(inputName, {
                    required: "This field is required"
                })}
                />
            </div>
        </div>
    )
}
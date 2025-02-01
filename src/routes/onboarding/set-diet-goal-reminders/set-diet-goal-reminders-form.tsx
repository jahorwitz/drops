import React from "react";
import {Form} from "../../../components";
// import { DietGoalsForm } from "./diet-goals-form";


interface Props {
    index?: number;
    onDelete?: (index:number) => void;
    elementId?: number;
}

const inputName = "Meal| Snack"
//Where does the onChange go?
//add edit Button to add Meal name || or Meal name input is needed

export const SetDietGoalsForm: React.FC<Props> = ({index}) => {
    return (
        <div className="absolute w-[358px] h-[76px] left-calc-50%-358px/2 top-[169px] flex flex-col items-center justify-center bg-white rounded-2xl px-3 py-4"
>
    <h2 className="font-rubik font-medium text-3xl leading-[120%] text-center text-gray-800">
Set your diet goals reminders
</h2>
<Form className="flex flex-col gap-5">
    <Form.AddMoreSection buttonText="+ Add more">
        <Form.ListTimeInput label= {inputName} parentIndex={index} />
    </Form.AddMoreSection>
</Form>
</div>
    )
}
import React from "react";
import { Form } from "../../../components"


export const SetDietGoals: React.FC = () =>  {
  return (
    <div className="bg-[#C9FBC9] h-screen flex flex-col items-center m-auto">
      <h1 className="text-black font-medium text-[32px] leading-[38.4px] w-[358px] text-center">Set your diet goals reminders</h1>
      <Form className="flex flex-col gap-5 bg-white mx-auto w-[370px] py-4 px-3 rounded-[16px] mt-8">
        <Form.AddMoreSection buttonText="+ Add more">
          <Form.ListTimeInput label="Meal"/>
        </Form.AddMoreSection>
      </Form>
    </div>
  )
}
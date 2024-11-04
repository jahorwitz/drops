import React from "react";
import { Form } from "../../../components"
import { MedicationSection } from "./medication-section";

export const MedicationReminderForm: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightYellow max-w-screen-md pb-8 px-[10px] relative m-auto">
      <h2 className="font-text text-section-header font-medium leader-[38.4px] text-center max-w-[358px] mx-auto">Set your medication reminders</h2>
      <p className="font-text text-center max-w-[358px] mx-auto mt-4 mb-8">It’s important to be consistent in your medications, and notifications may help!</p>
      <Form className="flex flex-col gap-5 ">
        <MedicationSection index={1} />
        <Form.AddMorebutton buttonText="+ Add another medication">
          <MedicationSection />
        </Form.AddMorebutton>
      </Form>
    </div>
  )
}
import React from "react";
import { Form } from "../../../components"
import { MedicationSection } from "./medication-section";

export const MedicationReminderForm: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightYellow max-w-screen-md pb-8 px-[10px] relative m-auto">
      <h2 className="text-base leading-[19px] font-text mb-1">Medication Reminders</h2>
      <p>It’s important to be consistent in your medications, and notifications may help!</p>
      <Form className="flex flex-col gap-5 ">
        <MedicationSection index={1} />
        <Form.AddMorebutton buttonText="+ Add another medication">
          <MedicationSection />
        </Form.AddMorebutton>
      </Form>
    </div>
  )
}
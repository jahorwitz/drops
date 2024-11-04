import React from "react";
import { Form } from "../../../components"
import { MedicationSection } from "./medication-section";

export const MedicationReminderForm: React.FC = () => {
  return (
    <div>
      <h2>Medication Reminders</h2>
      <p>It’s important to be consistent in your medications, and notifications may help!</p>
      <Form>
        <MedicationSection />
        <Form.AddMorebutton buttonText="+ Add another medication">
          <MedicationSection />
        </Form.AddMorebutton>
      </Form>
    </div>
  )
}
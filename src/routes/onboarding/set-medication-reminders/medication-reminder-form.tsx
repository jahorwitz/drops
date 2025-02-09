import React from "react";
import { Form } from "../../../components";
import { MedicationForm } from "../../../components/form/medication-form";
import { Button } from "../../../components";

export const MedicationReminderForm: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightYellow max-w-screen-md pb-8 px-[10px] relative m-auto h-screen">
      <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto">
        Set your medication reminders
      </h2>
      <p className="font-text text-center max-w-[358px] mx-auto mt-4 mb-8">
        It's important to be consistent in your medications, and notifications
        may help!
      </p>
      <Form className="flex flex-col gap-5 ">
        <Form.AddMoreSection buttonText="+ Add another medication">
          <MedicationForm title="Medication" isModal={false} buttonText="Save notifications" label="Medication name & amount"/>
        </Form.AddMoreSection>
              <Button variant="primary" type="submit" buttonText="Save notifications" className="mx-auto min-w-[315px] max-w-[400px] w-full"/>
      </Form>
    </div>
  );
};

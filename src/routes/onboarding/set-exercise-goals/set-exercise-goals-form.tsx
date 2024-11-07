import React from "react";
import { Form } from "../../../components"
import { SetExerciseGoals } from "./set-exercise-goals-content";

export const SetExerciseGoalsForm: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightBlue max-w-screen-md px-[10px] relative m-auto">
      <h2 className="font-text text-section-header font-medium leader-[38.4px] text-center max-w-[358px] mx-auto">Set your exercise goals</h2>
      <p className="font-text text-center max-w-[358px] mx-auto mt-4 mb-8">Doing some exercise can benefit your well-being a lot!</p>
      <Form className="flex flex-col gap-5">
        <Form.AddMoreSection buttonText="+ Add more exercises">
          <SetExerciseGoals />
        </Form.AddMoreSection>
      </Form>
    </div>
  )
}
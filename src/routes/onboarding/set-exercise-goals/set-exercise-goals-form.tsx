import React from "react";
import { Form } from "../../../components";
import { SetExerciseGoals } from "./set-exercise-goals-content";

export const SetExerciseGoalsForm: React.FC = () => {
    return (
        <div>
            <h2>Set your exercise goals</h2>
            <p>Doing some exercise can benefit your well-being a lot!</p>
            <Form>
                <Form.AddMoreSection buttonText = "+ Add more exercises">
                    <SetExerciseGoals />
                </Form.AddMoreSection>
            </Form>
        </div>
    )
}

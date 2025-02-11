import { useQuery } from "@apollo/client";
import { GET_USER_ACTIVITIES } from "../../../../graphql/queries/activities";
import { useEffect, useState } from "react";
import Exercise from "./exercise";
import { Button } from "../../../../components";
import { Modal, ModalProvider } from "../../../../components/modal";
import useModal from "../../../../components/modal/useModalHook";

interface Activity {
  id: string;
  name: string;
  daysOfWeek: string[];
  reminder: string[];
  time: string;
  duration: number;
}

export default function Exercises() {
  const { data: currentUserActivities } = useQuery(GET_USER_ACTIVITIES);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (currentUserActivities?.authenticatedItem.activities) {
      setActivities(currentUserActivities.authenticatedItem.activities);
    }
  }, [currentUserActivities]);

  const { openModal } = useModal();

  const addExercise = () => {
    console.log("adding");
  };

  const editExercise = () => {
    console.log("editing");
    openModal("glucose-measurement");
  };

  const deleteExercise = () => {
    console.log("deleting");
  };

  return (
    <div className="bg-gray-300 h-screen">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-3 max-w-lg">
        <h4 className="leading-6 font-medium text-xl">Excercises</h4>
        <ModalProvider>
          <Modal
            modalId="glucose-measurement"
            title="Add Glucose Measurement"
            buttonText="Add Measurement"
          >
            This is a modal
          </Modal>
          <div>
            {activities &&
              activities.map((activity) => {
                return (
                  <div key={activity.id}>
                    <Exercise
                      activity={activity}
                      editExercise={editExercise}
                      deleteExercise={deleteExercise}
                    />
                  </div>
                );
              })}
          </div>
          <Button
            variant="text"
            buttonText={"+ Add exercise"}
            onClick={() => addExercise()}
          />
        </ModalProvider>
      </div>
    </div>
  );
}

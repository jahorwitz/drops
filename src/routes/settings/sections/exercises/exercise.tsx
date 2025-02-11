import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../../../../components";

interface ExerciseProps {
  activity: {
    id: string;
    name: string;
    daysOfWeek: string[];
    reminder: string[];
    time: string;
    duration: number;
  };
  editExercise: () => void;
  deleteExercise: () => void;
}

export default function Exercise({
  activity,
  editExercise,
  deleteExercise,
}: ExerciseProps) {
  return (
    <div className="flex justify-between">
      <div>
        <p>{activity.name}</p>
        <p className="text-[black]/60">
          {activity.daysOfWeek.map((dayOfWeek: string) => {
            return `${dayOfWeek} `;
          })}
          {"/ "}
          {new Date(activity.time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <div>
        <Button
          variant="icon"
          icon={faPenToSquare}
          onClick={() => {
            editExercise();
          }}
        />
        <Button
          variant="icon"
          icon={faTrashCan}
          onClick={() => {
            deleteExercise();
          }}
        />
      </div>
    </div>
  );
}

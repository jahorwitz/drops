
import { GoalType } from '../../utils/goaltype';

export type ExerciseGoalProps = {
  type: GoalType;
  name: string;
  metric: Metric;
  daysOfWeek:  DayOfWeek[];
};

interface Metric {
  amount: number; 
  unitOfMeasure: string; 
}

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const ExerciseGoal: React.FC<ExerciseGoalProps> = ({ type, name, metric, daysOfWeek }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Type: {type}</p>
      <p>
        Goal: {metric.amount} {metric.unitOfMeasure}
      </p>
      <p>Days of the Week:</p>
      <ul>
        {daysOfWeek.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseGoal;
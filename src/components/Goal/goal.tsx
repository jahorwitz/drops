export enum GoalType {
    Exercise = 'exercise',
    Diet = 'diet',
  }
  
export interface Goal {
  type: GoalType;
  name: string;
  details: ExerciseDetails | DietDetails;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export interface ExerciseDetails {
  duration: number; // in minutes
  daysOfWeek: DayOfWeek[];
  time?: string; 
}

export interface DietDetails {
  calories: number;
  foodItems: string[];
}

// Goal.stories.tsx

import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Goal, GoalType, ExerciseDetails, DietDetails } from './goal'; // Import Goal and ExerciseDetails interfaces

// GoalComponent
const GoalComponent: React.FC<{ goal: Goal }> = ({ goal }) => {
  return (
    <div>
      <h3>Name: {goal.name}</h3>
      <p>Type: {goal.type}</p>
      <p>Details:</p>
      {renderDetails(goal)}
    </div>
  );
};

function renderDetails(goal: Goal) {
  const details = goal.details as ExerciseDetails;
  const dietDetails = goal.details as DietDetails;
  switch (goal.type) {
    case GoalType.Exercise:
      return (
        <div>
        <p>Duration: {details.duration} minutes</p>
        <p>Days of Week: {details.daysOfWeek.join(', ')}</p>
        {details.time && <p>Time: {details.time}</p>}
      </div>
      );
    case GoalType.Diet:
      return (
        <div>
        <p>Calories: {dietDetails.calories}</p>
        <p>Food Items: {dietDetails.foodItems.join(', ')}</p>
      </div>
      );
    // Handle other goal types as needed
    default:
      return null;
  }
}

export default {
  title: 'Goal',
  component: GoalComponent,
} as Meta;


// Define your Goal stories
export const Exercise: Story<{ goal: Goal }> = (args) => <GoalComponent {...args} />;
Exercise.args = {
  goal: {
    type: GoalType.Exercise,
    name: 'Weekly Exercise Routine',
    details: {
      duration: 30,
      daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
      time: '07:00 AM',
    } as ExerciseDetails
  }
};

export const Diet: Story<{ goal: Goal }> = (args) => <GoalComponent {...args} />;
Diet.args = {
  goal: {
    type: GoalType.Diet,
    name: 'Healthy Eating',
    details: {
      calories: 2000,
      foodItems: ['vegetables', 'fruits', 'lean protein']
    }
  }
};

import React from 'react';
import { Meta, Story } from '@storybook/react';
import ExerciseGoal, { ExerciseGoalProps } from './exercisegoal';
import { GoalType } from '../../utils/goal';

export default {
  title:'ExerciseGoal',
  component: ExerciseGoal,
} as Meta;


const Template: Story<ExerciseGoalProps> = (args) => <ExerciseGoal {...args} />;

export const YogaExercise = Template.bind({});
  YogaExercise.args = {
    type: GoalType.Exercise,
    name: 'Yoga',
    metric: {
      amount: 60,
      unitOfMeasure: 'min',
    },
    daysOfWeek: ['Monday', 'Wednesday'],
  };


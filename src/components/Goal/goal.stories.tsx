// src/GoalForm.stories.tsx

import React from 'react';
import { Meta, Story } from '@storybook/react';
import GoalForm from './goal';
import { Goal } from './goal';
import { GoalType } from '../../utils/goaltype';

export default {
  title: 'GoalForm',
  component: GoalForm,
};

const Template: Story<{ goal: Goal; onSave: (goal: Goal) => void }> = (args) => <GoalForm {...args} />;

export const ExerciseGoal = Template.bind({});
ExerciseGoal.args = {
  goal: {
    type: GoalType.Exercise,
    name: 'Morning Run',
    metric: { amount: 5, unitOfMeasure: 'km' },
    daysOfWeek: ['Monday', 'Wednesday', 'Friday'],
  },
  onSave: (goal) => console.log('Saved Goal:', goal),
};

export const DietGoal = Template.bind({});
DietGoal.args = {
  goal: {
    type: GoalType.Diet,
    name: 'Vegetable Intake',
    metric: { amount: 3, unitOfMeasure: 'servings' },
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  },
  onSave: (goal) => console.log('Saved Goal:', goal),
};

export const EmptyGoal = Template.bind({});
EmptyGoal.args = {
  goal: {
    type: GoalType.Exercise,
    name: '',
    metric: { amount: 0, unitOfMeasure: '' },
    daysOfWeek: [],
  },
  onSave: (goal) => console.log('Saved Goal:', goal),
};

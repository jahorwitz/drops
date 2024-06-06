
import { GoalType } from '../../utils/goaltype';
import {Form} from '../form'
import { Button } from '../button';

interface Metric {
  amount: number; 
  unitOfMeasure: string; 
}
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface Goal {
  type: GoalType;
  name: string;
  daysOfWeek:  DayOfWeek[];
  metric: Metric;
}

import React, { useState } from 'react';

interface GoalFormProps {
  goal: Goal;
  onSave: (goal: Goal) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ goal, onSave }) => {
  const [formData, setFormData] = useState<Goal>(goal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? Number(value) : value,
    });
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      metric: {
        ...formData.metric,
        [name]: name === 'amount' ? Number(value) : value,
      },
    });
  };

  const handleDaysOfWeekChange = (day: DayOfWeek) => {
    const daysOfWeek = formData.daysOfWeek || [];
    if (daysOfWeek.includes(day)) {
      setFormData({
        ...formData,
        daysOfWeek: daysOfWeek.filter(d => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        daysOfWeek: [...daysOfWeek, day],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Type: </label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="exercise">Exercise</option>
          <option value="diet">Diet</option>
        </select>
      </div>
      <div>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          value={formData.metric.amount}
          onChange={handleMetricChange}
          required
        />
      </div>
      <div>
        <label>Unit of Measure: </label>
        <input
          type="text"
          name="unitOfMeasure"
          value={formData.metric.unitOfMeasure || ''}
          onChange={handleMetricChange}
        />
      </div>
      <div>
        <label>Days of the Week: </label>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
          <label key={day}>
            <input
              type="checkbox"
              name="daysOfWeek"
              value={day}
              checked={formData.daysOfWeek?.includes(day as DayOfWeek) || false}
              onChange={() => handleDaysOfWeekChange(day as DayOfWeek)}
            />
            {day}
          </label>
        ))}
      </div>
      <Button type="submit" buttonText = "Save settings" ></Button>
    </Form>
  );
};

export default GoalForm;

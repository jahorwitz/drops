
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

type Reminder = {
  time: string;
};

type MedicationFormInputs = {
  name: string;
  reminders: Reminder[];
};

const MedicationForm: React.FC = () => {
  const { register, control, handleSubmit, reset } = useForm<MedicationFormInputs>({
    defaultValues: {
      name: '',
      reminders: [{ time: '' }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'reminders',
  });

  const onSubmit = (data: MedicationFormInputs) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name & dosage</label>
        <input id="name" {...register('name', { required: true })} placeholder="Type name & dosage" />
      </div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <label htmlFor={`reminder-${index}`}>Reminder {index + 1}</label>
          <input
            type="time"
            id={`reminder-${index}`}
            {...register(`reminders.${index}.time`, { required: true })}
          />
        </div>
      ))}
      <button type="button" onClick={() => append({ time: '' })}>
        + Add more reminders
      </button>
      <button type="submit">Save</button>
    </form>
  );
};

export default MedicationForm;

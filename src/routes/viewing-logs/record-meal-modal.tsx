import React from "react";
import {useForm} from "react-hook-form";
import { TextInput } from "../../components/form/text-input";
import { Button } from "../../components/button";


interface RecordMealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecordMealModal: React.FC<RecordMealModalProps> = ({ isOpen, onClose }) => {
    const {register} = useForm();
  if (!isOpen) return null;
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Record a meal</h2>
          <button onClick={onClose}>X</button>
        </div>

        <div className="flex flex-col gap-4">
          <TextInput {...register("mealName")} labelText="MealName" />
          <TextInput {...register("calories")} labelText="Calories" />
            <TextInput {...register("time")} labelText="Time" />

          <Button buttonText="Add Measurement" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
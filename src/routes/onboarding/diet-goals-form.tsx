import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components"

export const DietGoalsForm: React.FC = () => {
  interface FormValues {
    meals: number;
    snacks: number;
    carbs: number;
    fiber: number;
    water: number;
    calories: number;
  }

  // register acts as onChange function
  const {
    register,
    formState: {errors},
  } = useForm<FormValues>({defaultValues: {
    carbs: 135,
    fiber: 25,
    water: 15,
    calories: 2500, 
  }});

  return (
    <div className="flex flex-col bg-lightGreen overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <h2 className="font-text text-section-header font-medium mt-5 leading-[52.8px] text-center max-w-[358px] mx-auto">
        Set your diet goals
      </h2>
      <Form className="flex flex-col bg-white max-w-[370px] w-full px-3  mt-8 h-fit  max-h-[900px] py-4 self-center rounded-3xl">
        <div className="flex flex-col h-fit gap-5">
          <Form.NumericInput {...register("meals", {
              validate: (value) => (value ? (value >= 3 || 'This field must be greater than or equal to 3') : 'This field is required'),
            })}
            labelText="Meals per day"
            hintText="3 is a recommended amount"
            feedback={errors.meals?.message}
            defaultValue={3}
            />
          <Form.NumericInput {...register("snacks", {
              validate: (value) => (value ? (value <= 3 || 'This field must be greater than or equal to 3') : 'This field is required'),
            })}
            labelText="Snacks per day"
            hintText="2 is a recommended amount"
            feedback={errors.snacks?.message}
            defaultValue={2}
            />
          <Form.TextInput
          labelText="Carbs per day (grams)"
          hintText="135 grams per day is recommended for people of your age"
          placeholder="Enter your carbs per day"
          type="text"
          feedback={errors.carbs?.message}
          {...register("carbs", {
            required: "This field is required",
          })}
          />
          <Form.TextInput
          labelText="Fiber per day (grams)"
          hintText="25 grams per day is recommended for people of your age"
          placeholder="Enter your fiber per day"
          type="text"
          feedback={errors.fiber?.message}
          {...register("fiber", {
            required: "This field is required",
          })}
          />
          <Form.TextInput
          labelText="Cups of water per day"
          hintText="15 cups per day is recommended for people of your age"
          placeholder="Enter your cups of water per day"
          type="text"
          feedback={errors.water?.message}
          {...register("water", {
            required: "This field is required",
          })}
          />
          <Form.TextInput
          labelText="Calorie limit"
          hintText="2500 kCal per day is recommended for people of your age"
          placeholder="Enter your calorie limit"
          type="text"
          feedback={errors.calories?.message}
          {...register("calories", {
            required: "This field is required",
          })}
          />
        </div>
      </Form>
    </div>
  )
}
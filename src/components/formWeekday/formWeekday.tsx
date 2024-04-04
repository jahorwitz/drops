import { Form } from "../form/form";
import { useForm } from "react-hook-form";
import React from "react";

type WeekdaysProps = {
  title: string;
  hintText: string;
};

const FormWeekday = ({ title, hintText }: WeekdaysProps) => {
  const { register, handleSubmit, setError, clearErrors } = useForm();
  const [currentSelectedDays, setCurrentSelectedDays] = React.useState<
    string[]
  >([]);

  const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const onSubmit = (data: object) => {
    if (currentSelectedDays.length === 0) {
      setError("selectedDays", {
        message: "Please select a day",
      });
    } else {
      clearErrors("selectedDays");
      console.log(data);
    }
  };

  const handleCheck = (day: string) => {
    if (currentSelectedDays.includes(day)) {
      setCurrentSelectedDays(currentSelectedDays.filter((d) => d != day));
    } else {
      setCurrentSelectedDays([...currentSelectedDays, day]);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-pageContent mx-3 relative font-text">
        <label className="">{title}</label>
        <div className="flex justify-between mt-3">
          {days.map((day) => (
            <div key={day} className={`relative`}>
              <input
                id={day}
                {...register("selectedDays")}
                checked={currentSelectedDays.includes(day)}
                type="checkbox"
                value={day}
                className="sr-only"
                onChange={() => handleCheck(day)}
              />
              <label
                htmlFor={day}
                className={`flex items-center justify-center h-10 w-10 rounded-full border text-sm ${
                  currentSelectedDays.includes(day)
                    ? "text-white bg-black border-black"
                    : "text-black/60 border-black/30"
                }`}
              >
                {day}
              </label>
            </div>
          ))}
        </div>
        {hintText && <span className="text-black/60 text-sm">{hintText}</span>}
      </div>
    </Form>
  );
};

export default FormWeekday;

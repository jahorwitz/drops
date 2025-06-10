import { useRef, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import IMask from "imask";
import cx from "classnames";
import type { ExerciseFormFields } from "../exercises/ExerciseForm"; 

// Define props using the specific ExerciseFormFields instead of generic FieldValues
// This avoids the ESLint 'no-explicit-any' rule

type Props = {
  labelText?: string;
  hintText?: string;
  feedback?: string;
  className?: string;
  setValue: UseFormSetValue<ExerciseFormFields>; 
  hour?: string;
  minute?: string;
  period?: string;
};

export const TimePicker = ({
  labelText,
  hintText,
  feedback,
  className,
  setValue,
  hour: propHour = "",
  minute: propMinute = "",
  period: propPeriod = "AM",
}: Props) => {
  // Initialize state with props for controlled behavior
  const [hour, setHour] = useState<string>(propHour);
  const [minute, setMinute] = useState<string>(propMinute);
  const [period, setPeriod] = useState<string>(propPeriod);

  // Refs for hour, minute, and period input fields
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // Apply input masks on mount
    const hourMask = IMask(hourRef.current!, { mask: "00" });
    const minuteMask = IMask(minuteRef.current!, { mask: "00" });

    // Cleanup on unmount
    return () => {
      hourMask.destroy();
      minuteMask.destroy();
    };
  }, []);

  // Ensure values like "5" become "05"
  const addLeadingZero = (value: string): string => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue < 10 && parsedValue !== 0) {
      return `0${parsedValue}`;
    }
    return value;
  };

useEffect(() => {
   // Only sync time value to form if this TimePicker is controlled by react-hook-form
  // Prevents infinite re-renders in forms like MedicationForm by checking for propHour
  if (typeof setValue === "function" && propHour !== undefined) {
    setValue("timeValue", `${hour}:${minute} ${period}`, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }
}, [hour, minute, period, setValue, propHour]);



  // Event handlers for input changes and blur
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHour(e.target.value);
  const handleHourBlur = () => setHour(addLeadingZero(hour));

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMinute(e.target.value);
  const handleMinuteBlur = () => setMinute(addLeadingZero(minute));

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setPeriod(e.target.value);

  const inputClassName =
    "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";

  return (
    <div className="w-full">
      {labelText && (
        <label className="text-base leading-[19px] font-text mb-1">
          {labelText}
        </label>
      )}
      <div className="h-[76px] bg-gray-100 rounded-lg flex items-center p-2">
        <input
          ref={hourRef}
          value={hour}
          onChange={handleHourChange}
          onBlur={handleHourBlur}
          className={cx(inputClassName, className)}
          inputMode="numeric"
          placeholder="00"
        />
        <span className="ml-[12px] mr-3">:</span>
        <input
          ref={minuteRef}
          value={minute}
          onChange={handleMinuteChange}
          onBlur={handleMinuteBlur}
          className={cx(inputClassName, className, "mr-2")}
          inputMode="numeric"
          placeholder="00"
        />
        <select
          ref={periodRef}
          value={period}
          onChange={handlePeriodChange}
          className={cx(inputClassName, className, "font-text")}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      {feedback ? (
        <span className="text-red text-base leading-5">{feedback}</span>
      ) : hintText ? (
        <span className="text-black/60 text-base">{hintText}</span>
      ) : null}
    </div>
  );
};

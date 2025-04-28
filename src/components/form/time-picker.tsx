import { useRef, useEffect, useState } from "react";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import IMask from "imask";
import cx from "classnames";

type Props<T extends FieldValues> = {
  labelText?: string;
  hintText?: string;
  feedback?: string;
  className?: string;
  setValue: UseFormSetValue<T>;
};

export const TimePicker = ({
  labelText,
  hintText,
  feedback,
  className,
  setValue,
}: Props<FieldValues>) => {
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [period, setPeriod] = useState<string>("AM");

  // Refs for hour, minute, and period input fields
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const hourMask = IMask(hourRef.current!, { mask: "00" });
    const minuteMask = IMask(minuteRef.current!, { mask: "00" });

    return () => {
      hourMask.destroy();
      minuteMask.destroy();
    };
  }, []);

  const addLeadingZero = (value: string): string => {
    const parsedValue = parseInt(value, 10);  // Parse the input value as an integer
    if (!isNaN(parsedValue) && parsedValue < 10 && parsedValue !== 0) {
      return `0${parsedValue}`;
    }
    return value;
  };

  useEffect(() => {
    setValue("timeValue", `${hour}:${minute} ${period}`, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [hour, minute, period, setValue]);


  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => setHour(e.target.value);
  const handleHourBlur = () => setHour(addLeadingZero(hour));
    // Process the value when the focus is lost
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => setMinute(e.target.value);
  const handleMinuteBlur = () => setMinute(addLeadingZero(minute));
 // Process the value when the focus is lost
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPeriod(e.target.value);

  const inputClassName = "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";

  return (
    <div className="w-full">
      {labelText && (
        <label className="text-base leading-[19px] font-text mb-1">{labelText}</label>
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
          inputMode="numeric" // Show numeric keypad on mobile
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

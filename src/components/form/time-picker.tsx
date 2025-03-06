import { forwardRef, useRef, useEffect, useState } from "react";
import cx from "classnames";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import IMask from "imask";

type Props<T extends FieldValues> = {
  name: string;
  labelText?: string;
  hintText?: string;
  feedback?: string;
  className?: string;
  setValue: UseFormSetValue<T>;
};

export const TimePicker = forwardRef<HTMLInputElement, Props<FieldValues>>(
  (
    { name, labelText, hintText, feedback, className, setValue, ...rest },
    ref
  ) => {
    const [hour, setHour] = useState<string>("");
    const [minute, setMinute] = useState<string>("");
    const [period, setPeriod] = useState<string>("AM");

    // Refs for hour, minute, and period input fields
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);
    const periodRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
      const hourMask = IMask(hourRef.current!, {
        mask: "00",
        blocks: {
          "00": {
            mask: /^(?:[1-9]|1[0-2])$/,
            placeholderChar: "00",
          },
        },
      });
      const minuteMask = IMask(minuteRef.current!, {
        mask: "00",
        blocks: {
          "00": {
            mask: /^(0?[1-9]|[1-5][0-9]|59)$/,
            placeholderChar: "00",
          },
        },
      });
      return () => {
        hourMask.destroy();
        minuteMask.destroy();
      };
    }, []);

    const addLeadingZero = (value: string): string => {
      const parsedValue = parseInt(value, 10); // Parse the input value as an integer
      if (!isNaN(parsedValue) && parsedValue < 10 && !(parsedValue === 0)) {
        return `0${parsedValue}`;
      } else {
        return value;
      }
    };

    useEffect(() => {
      setValue(name, `${hour}:${minute}:${period}`, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }, [hour, minute, period, setValue]);

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHour(value);
    };

    const handleHourBlur = () => {
      // Process the value when the focus is lost
      setHour(addLeadingZero(hour));
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMinute(value);
    };

    const handleMinuteBlur = () => {
      // Process the value when the focus is lost
      setMinute(addLeadingZero(minute));
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setPeriod(value);
    };

    const inputClassName =
      "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";
    return (
      <div className="w-full">
        <label className="text-base leading-[19px] font-text mb-1">
          {labelText}
        </label>
        <div className="h-[76px] bg-gray-100 rounded-lg flex items-center p-2">
          <input
            type="text"
            {...rest}
            ref={hourRef}
            value={hour}
            name={hour}
            onChange={handleHourChange}
            onBlur={handleHourBlur}
            className={cx(inputClassName, className)}
            inputMode="numeric"
            placeholder="00"
          />
          <span className="ml-[12px] mr-3">:</span>
          <input
            type="text"
            {...rest}
            ref={minuteRef}
            value={minute}
            name={minute}
            onChange={handleMinuteChange}
            onBlur={handleMinuteBlur}
            className={cx(inputClassName, className, "mr-2")}
            inputMode="numeric" // Show numeric keypad on mobile
            placeholder="00"
          />

          <select
            ref={periodRef}
            value={period}
            name={period}
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
  }
);

TimePicker.displayName = "TimePicker";

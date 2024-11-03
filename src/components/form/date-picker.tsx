import { HTMLProps, forwardRef, useRef, useEffect, useState } from "react";
import cx from "classnames";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";

type Props<T extends FieldValues> = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    setValue: UseFormSetValue<T>;
  };

export const DatePicker = forwardRef<HTMLInputElement, Props<FieldValues>>(
  ({
    labelText,
    hintText,
    feedback,
    className,
    setValue,
    ...rest
  }: Props<FieldValues>) => {
    const [hour, setHour] = useState<string>("");
    const [minute, setMinute] = useState<string>("");

    // Refs for hour, minute, and period input fields
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setValue("timeValue", `${hour}:${minute}`, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }, [hour, minute, setValue]);

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHour(value);
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMinute(value);
    };

    const inputClassName =
      "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";
    return (
      <div>
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
            className={cx(inputClassName, className, "mr-2")}
            inputMode="numeric" // Show numeric keypad on mobile
            placeholder="00"
          />
        </div>
        {feedback ? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  },
);
DatePicker.displayName = "DatePicker";

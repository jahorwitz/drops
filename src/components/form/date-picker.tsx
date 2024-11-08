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
    const [date, setDate] = useState<string>("");

    // Refs for hour, minute, and period input fields
    const dateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setValue("Value", `${date}`, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }, [date, setValue]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDate(value);
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
            ref={dateRef}
            value={date}
            name={date}
            onChange={handleDateChange}
            className={cx(inputClassName, className)}
            inputMode="numeric"
            placeholder="DD.MM.YYYY"
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

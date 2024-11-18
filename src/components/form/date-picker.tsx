import { HTMLProps, forwardRef, useState } from "react";
import cx from "classnames";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props<T extends FieldValues> = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    setValue: UseFormSetValue<T>;
  };

export const DatePicker = forwardRef<HTMLInputElement, Props<FieldValues>>(
  ({ labelText, hintText, feedback, className }: Props<FieldValues>) => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        {labelText && <label>{labelText}</label>}
        <DatePickerLib
          selected={startDate}
          placeholderText="MM/DD/YYYY"
          onChange={(date) => setStartDate(date)}
          popperPlacement="bottom-start"
          className={cx(
            `rounded-lg border-black border-[1px] py-5 px-3`,
            className,
          )}
        />
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

import { HTMLProps, forwardRef, useRef, useEffect, useState } from "react";
import cx from "classnames";
import {
  UseFormRegisterReturn,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import IMask from "imask";
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
  ({
    labelText,
    hintText,
    feedback,
    className,
    setValue,
    ...rest
  }: Props<FieldValues>) => {
    const [selectedDate, setSelectedDate] = useState<string>("");
    const dateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (dateRef.current) {
        const mask = IMask(dateRef.current, {
          mask: "d.`m.`y",
          blocks: {
            d: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 31,
              placeholderChar: "d",
            },
            m: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 12,
              placeholderChar: "m",
            },
            Y: {
              mask: IMask.MaskedRange,
              from: 1900,
              to: 2099,
              placeholderChar: "y",
            },
          },
        });

        mask.on("accept", () => {
          setSelectedDate(mask.value);
          setValue("dateValue", mask.value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        });
      }
    }, [setValue]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSelectedDate(value);
    };

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <DatePickerLib
          dateFormat="DD.MM.YYYY"
          onChange={(date) => setSelectedDate(date ? date.toString() : "")}
          customInput={
            <input
              type="text"
              {...rest}
              ref={dateRef}
              value={selectedDate}
              name={selectedDate}
              onChange={handleDateChange}
              className={cx(
                `rounded-lg border-black border-[1px] py-5 px-3`,
                className,
              )}
              inputMode="numeric"
              placeholder="DD.MM.YYYY"
            />
          }
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

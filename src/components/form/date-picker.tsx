import { forwardRef, useState } from "react";
import cx from "classnames";
import DatePickerLib from "react-datepicker";
import type { ReactElement } from "react";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerFormValues = {
  dateValue: Date | null;
};

type CustomProps<TFieldValues extends DatePickerFormValues> = {
  labelText?: string;
  hintText?: string;
  feedback?: string;
  className?: string;
  name?: keyof TFieldValues & string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
};

export const DatePicker = forwardRef(
  <TFieldValues extends DatePickerFormValues>(
    props: CustomProps<TFieldValues>,
    ref: React.Ref<DatePickerLib>
  ): ReactElement => {
    const {
      labelText,
      hintText,
      feedback,
      className,
      onChange,
      value,
      ...rest
    } = props;

    const [startDate, setStartDate] = useState<Date | null>(value || null);

    const handleDateChange = (date: Date | null) => {
      setStartDate(date);
      if (onChange) {
        onChange(date);
      }
    };

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        {labelText && <label>{labelText}</label>}
        <DatePickerLib
          ref={ref}
          selected={startDate}
          placeholderText="MM/DD/YYYY"
          onChange={handleDateChange}
          popperPlacement="bottom-start"
          className={cx(
            `rounded-lg border-black border-[1px] py-5 px-3`,
            className,
          )}
          isClearable
          showPopperArrow={false}
          dateFormat="MM/dd/yyyy"
          {...rest}
        />
        {feedback ? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

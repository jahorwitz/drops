import { HTMLProps, forwardRef, useRef, useEffect, useState } from "react";
import cx from "classnames";
import { UseFormSetValue, FieldValues } from "react-hook-form";
import IMask from "imask";

type Props<T extends FieldValues> = HTMLProps<HTMLInputElement> & {
  labelText?: string;
  hintText?: string;
  feedback?: string;
  className?: string;
  setValue: UseFormSetValue<T>;
  value?: string;
};

export const TimePicker = forwardRef<HTMLInputElement, Props<FieldValues>>(
  function TimePickerComponent({
    labelText,
    hintText,
    feedback,
    className,
    setValue,
    value = "",
    ...rest
  }: Props<FieldValues>) {
    const [hour, setHour] = useState<string>("");
    const [minute, setMinute] = useState<string>("");
    const [period, setPeriod] = useState<string>("AM");

    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);
    const periodRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
      if (value) {
        const [hour, minute, period] = value.split(/[: ]/);

        setHour(hour);
        setMinute(minute);
        setPeriod(period);

        if (hourRef.current) hourRef.current.value = hour;
        if (minuteRef.current) minuteRef.current.value = minute;
        if (periodRef.current) periodRef.current.value = period;
      }
    }, [value]);

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
            mask: /^(0?[0-9]|[1-5][0-9])$/,
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
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue) && parsedValue < 10 && parsedValue !== 0) {
        return `0${parsedValue}`;
      } else {
        return value;
      }
    };

    useEffect(() => {
      setValue("timeValue", `${hour}:${minute} ${period}`, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }, [hour, minute, period, setValue]);

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHour(e.target.value);
    };

    const handleHourBlur = () => {
      setHour(addLeadingZero(hour));
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMinute(e.target.value);
    };

    const handleMinuteBlur = () => {
      setMinute(addLeadingZero(minute));
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPeriod(e.target.value);
    };

    const inputClassName =
      "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";

    return (
      <div className="w-full">
        <label className="text-base leading-[19px] font-text mb-1">
          {labelText}
        </label>
        <div className="h-[76px] bg-gray-100 rounded-lg flex items-center">
          <input
            type="text"
            {...rest}
            ref={hourRef}
            value={hour}
            name="hour"
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
            name="minute"
            onChange={handleMinuteChange}
            onBlur={handleMinuteBlur}
            className={cx(inputClassName, className, "mr-2")}
            inputMode="numeric"
            placeholder="00"
          />
          <select
            ref={periodRef}
            value={period}
            name="period"
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

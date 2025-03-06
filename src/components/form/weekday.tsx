import { capitalize } from "lodash";
import { UseFormRegisterReturn } from "react-hook-form";
import { HTMLProps, forwardRef, useState } from "react";
import { enumKeys, Weekday, shortenWeekday } from "../../utils";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };

export const WeekdaySelector = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }, ref) => {
    const [currentSelectedDays, setCurrentSelectedDays] = useState<string[]>(
      []
    );
    const [uniqueId] = useState(
      () => `weekday-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    );

    const handleCheck = (day: Weekday) => {
      if (currentSelectedDays.includes(day)) {
        setCurrentSelectedDays(currentSelectedDays.filter((d) => d != day));
      } else {
        setCurrentSelectedDays([...currentSelectedDays, day]);
      }
    };

    return (
      <div className={`font-text ${className}`}>
        <label className="">{labelText}</label>
        <div className="flex gap-3 mt-3">
          {enumKeys(Weekday).map((day) => (
            <div key={Weekday[day]} className="relative">
              <input
                {...rest}
                ref={ref}
                id={`${uniqueId}-${Weekday[day]}`}
                checked={currentSelectedDays.includes(Weekday[day])}
                type="checkbox"
                value={Weekday[day]}
                className="sr-only"
                onChange={() => handleCheck(Weekday[day])}
              />
              <label
                htmlFor={`${uniqueId}-${day}`}
                className={`flex items-center justify-center h-10 w-10 rounded-full border text-sm ${
                  currentSelectedDays.includes(day)
                    ? "text-white bg-black border-black"
                    : "text-black/60 border-black/30"
                }`}
              >
                {capitalize(shortenWeekday(Weekday[day]))}
              </label>
            </div>
          ))}
        </div>
        {feedback ? (
          <span className="text-red text-sm">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-sm">{hintText}</span>
        ) : null}
      </div>
    );
  }
);

WeekdaySelector.displayName = "Weekday";

import { UseFormRegisterReturn } from "react-hook-form";
import { HTMLProps, forwardRef, useState } from "react";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };

export const Weekday = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }: Props, ref) => {
    const [currentSelectedDays, setCurrentSelectedDays] = useState<string[]>(
      [],
    );
    const [uniqueId] = useState(
      () => `weekday-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    );
    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

    const handleCheck = (day: string) => {
      if (currentSelectedDays.includes(day)) {
        setCurrentSelectedDays(currentSelectedDays.filter((d) => d != day));
      } else {
        setCurrentSelectedDays([...currentSelectedDays, day]);
      }
    };

    return (
      <div className={`max-w-pageContent mx-3 relative font-text ${className}`}>
        <label className="">{labelText}</label>
        <div className="flex justify-between mt-3">
          {days.map((day) => (
            <div key={day} className={`relative`}>
              <input
                {...rest}
                ref={ref}
                id={`${uniqueId}-${day}`}
                checked={currentSelectedDays.includes(day)}
                type="checkbox"
                value={day}
                className="sr-only"
                onChange={() => handleCheck(day)}
              />
              <label
                htmlFor={`${uniqueId}-${day}`}
                className={`flex items-center justify-center h-10 w-10 rounded-full border text-sm ${
                  currentSelectedDays.includes(day)
                    ? "text-white bg-black border-black"
                    : "text-black/60 border-black/30"
                }`}
              >
                {day}
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
  },
);

Weekday.displayName = "Weekday";

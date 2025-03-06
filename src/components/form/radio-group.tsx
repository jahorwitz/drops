import { HTMLProps, forwardRef } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    options: Option[];
    feedback?: FieldErrors<T>;
  };

export const RadioGroup = forwardRef<HTMLInputElement, Props<FieldValues>>(
  ({ name, labelText, hintText, options, feedback, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label
              key={index}
              htmlFor={name}
              className="font-text flex items-center space-x-2 border-2 border-lightGray rounded-lg p-3 text-paragraph-lg"
            >
              <input
                {...rest}
                name={name}
                ref={ref}
                type="radio"
                value={option.value}
                className={`appearance-none h-4 w-4 border-4 bold-border-black rounded-full checked:border-black focus:outline-none focus:ring-1 focus:ring-black`}
              />
              <span className="text-paragraph-lg text-black-400">
                {option.label}
              </span>
            </label>
          ))}
        </div>
        {feedback ? (
          <span className="text-red text-base leading-5">
            {feedback[name]?.message as string}
          </span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

import cx from "classnames";
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
  (
    {
      name,
      labelText,
      hintText,
      options,
      feedback,
      ...rest
    }: Props<FieldValues>,
    ref
  ) => {
    const { value } = rest;

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <div className="space-y-2">
          {options.map((option, index) => (
            <label
              key={index}
              htmlFor={name}
              className={cx(
                "font-text flex items-center space-x-2 border-2 border-black/30 bg-white rounded-lg p-3 text-paragraph-lg",
                value === option.value && "border-black/100"
              )}
            >
              <input
                {...rest}
                name={name}
                ref={ref}
                type="radio"
                value={option.value}
                className={`appearance-none h-4 w-4 border-2 bold-border-black rounded-full checked:border-black checked:border-[6px] focus:outline-none focus:ring-1 focus:ring-black`}
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

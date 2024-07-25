import { HTMLProps, forwardRef } from "react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";

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

  export const SelectForm = forwardRef<HTMLInputElement, Props<FieldValues>>(
    ({ name, labelText, hintText, options, feedback,}: Props<FieldValues>) => {
      return (
        <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
          <label htmlFor={name} className="font-medium text-gray-700">{labelText}</label>
          <select
          id={name}
          name={name}
          className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
          <option value="" disabled selected> Choose</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {feedback ? (
            <span className="text-red text-base leading-5">{feedback[name]?.message as string}</span>
          ) : hintText ? (
            <span className="text-black/60 text-base">{hintText}</span>
          ) : null}
        </div>
      );
    },
  );
  
  SelectForm.displayName = "SelectForm";
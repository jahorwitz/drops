import cx from "classnames";
import { HTMLProps, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    filled?: string;
  };

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, filled, ...rest }: Props, ref) => {
    const textInputClass = cx({
      "rounded-lg": true,
      "border-[1px]": true,
      "py-5": true,
      "px-3": true,
      "border-black": true,
      "border-opacity-30": filled,
    });

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input {...rest} ref={ref} className={textInputClass} />
        {feedback ? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";

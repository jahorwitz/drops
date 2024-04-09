import cx from "classnames";
import { HTMLProps, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };

export const NumericInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }: Props, ref) => {
    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          className={cx(
            `rounded-lg border-black border-[1px] py-5 px-3 relative`,
            className,
          )}
        />
        <button className = "absolute z-1">-</button>
        <button className = "absolute z-1">+</button>
        {feedback ? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  },
);
NumericInput.displayName = "NumericInput";

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

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }: Props, ref) => {
    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          className={cx(
            `rounded-lg border-black border-[1px] py-5 px-3`,
            className,
          )}
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
TextInput.displayName = "TextInput";
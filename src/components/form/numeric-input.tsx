import cx from "classnames";
import { HTMLProps, forwardRef, useRef} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };

export const NumericInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleMinusClick = () => {
      if (inputRef.current) {
        const currentValue = parseInt(inputRef.current.value);
        if (currentValue > 0) {
          inputRef.current.value = (currentValue - 1).toString();
        }
      }
    };

    const handlePlusClick = () => {
      if (inputRef.current) {
        const currentValue = parseInt(inputRef.current.value);
        inputRef.current.value = (currentValue + 1).toString();
      }
    };

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={inputRef}
          className={cx(
            `rounded-lg border-black border-[1px] py-5 px-3 relative`,
            className,
          )}
        />
        <button type="button" className = "absolute top-14 right-20 z-1 rounded-full border-solid border border-[#000] h-8 w-8 text-[16px]" onClick={handleMinusClick}
>-</button>
        <button type="button" className = "absolute top-14 right-10 z-1 rounded-full border-solid border border-[#000] h-8 w-8 text-[16px]" onClick={handlePlusClick}>+</button>
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

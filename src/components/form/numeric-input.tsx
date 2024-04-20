import cx from "classnames";
import { HTMLProps, forwardRef, useState} from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    defaultValue?: string | number;  // Add a defaultValue prop
  };

export const NumericInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, defaultValue, ...rest }: Props, ref) => {
    const [value, setValue] = useState<string | undefined>(defaultValue?.toString() || "");

    const handleMinusClick = () => {
      const currentValue = parseInt(value || "0", 10);
      if (!isNaN(currentValue) && currentValue > 0) {
        setValue((currentValue - 1).toString());
      }
    };

    const handlePlusClick = () => {
      const currentValue = parseInt(value || "0", 10);
      if (!isNaN(currentValue)) {
        setValue((currentValue + 1).toString());
      } else {
        setValue("1"); // Set to 1 if empty or NaN
      }
    };

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}  // Update state on change  
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

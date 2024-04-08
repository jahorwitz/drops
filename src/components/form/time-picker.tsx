import { HTMLProps, forwardRef } from "react";
import cx from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };
  export const TimePicker = forwardRef<HTMLInputElement, Props>(
    ({ labelText, hintText, feedback, className, ...rest }: Props, ref) => {
    const inputClassName = "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";
      return (
        <div>
          <label className="text-base leading-[19px] font-text mb-1">{labelText}</label>
          <div className="h-[76px] bg-gray-100 rounded-lg flex items-center p-2">
          <input
            {...rest}
            ref={ref}
            className={cx(inputClassName, className)}
          />
           <span className="ml-[12px] mr-3">:</span>
          <input 
           {...rest}
           ref={ref}
           className={cx(inputClassName, className, "mr-2")}/>
          <input 
           {...rest}
           ref={ref}
          className={cx(inputClassName, className, "font-text")}
        />
        </div>
        {feedback ? (
            <span className="text-red text-base leading-5">{feedback}</span>
          ) : hintText ? (
            <span className="text-black/60 text-base">{hintText}</span>
          ) : null}
          </div>
      );
    },
  );
 TimePicker.displayName = "TimePicker";

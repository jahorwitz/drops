// import React from "react";
// import cx from "classnames";
import { HTMLProps, forwardRef } from "react";
// import DatePicker from 'react-datepicker/dist/index.d.ts'
import { UseFormRegisterReturn} from "react-hook-form";


type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    // setValue: UseFormSetValue<T>
    // onChange?: (date: Date | null, event?: MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent<HTMLElement>) => void;
  };

export const DatePickerComponent = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, /* className, onChange, ...rest  */}: Props) => {
    return (
      <div>
        <label className="text-base leading-[19px] font-text mb-1">{labelText}</label>
            <div>
  {/* <DatePicker/> */}
            </div>
    
        
        {feedback? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  },
);
DatePickerComponent.displayName = "DatePickerComponent";

/*          <DatePicker
           onChange={(date: Date | null, event?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void}
           className={cx("w-full p-2 border border-solid border-gray-400 rounded-lg", className)}
           {...rest} 
/> */
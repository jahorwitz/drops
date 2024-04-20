import { HTMLProps, forwardRef, useRef, useEffect, useState} from "react";
import cx from "classnames";
import { UseFormRegisterReturn, useForm} from "react-hook-form";
import IMask from 'imask';


type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
   
  };


  export const TimePicker = forwardRef<HTMLInputElement, Props>(
    ({ labelText, hintText, feedback, className, ...rest }: Props, ) => {
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const [period, setPeriod] = useState<string>('AM');

    const { setValue } = useForm(); // Access the form instance

      // Refs for hour, minute, and period input fields
     const hourRef = useRef<HTMLInputElement>(null);
     const minuteRef = useRef<HTMLInputElement>(null);
     const periodRef = useRef<HTMLSelectElement>(null);

     useEffect(() => {
      const hourMask = IMask(hourRef.current!, {
        mask: "00",
        blocks: {
          "00": {
            mask: /^(?:[1-9]|1[0-2])$/,
            placeholderChar: "00",
          },
        },
      });
      const minuteMask = IMask(minuteRef.current!, {
        mask: "00",
        blocks: {
          "00": {
            mask: /^(0?[1-9]|[1-5][0-9]|59)$/,
            placeholderChar: "00",
          },
        },
      });
  
      return () => {
        hourMask.destroy();
        minuteMask.destroy();
      };
    }, []);
  
   
    useEffect(() => {
      console.log('time', `${hour}:${minute}:${period}`);
      setValue('time', `${hour}:${minute}:${period}`);
    }, [hour, minute, period, setValue]);


 
    const addLeadingZero = (value: string): string => {
    const parsedValue = parseInt(value, 10); // Parse the input value as an integer
    if (isNaN(parsedValue)) return ''; // If parsing fails, return an empty string
    return parsedValue < 10 && parsedValue >= 10 ? `0${parsedValue}` : value; // Add leading zero if necessary and value is not negative
};

  

    const handleInputBlur = (ref: React.RefObject<HTMLInputElement>) => {
      return () => {
        if (ref.current) {
          let inputValue = ref.current.value.trim();
          inputValue = addLeadingZero(inputValue);
          ref.current.value = inputValue;
        }
      };
    };

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHour(addLeadingZero(value));
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMinute(addLeadingZero(value))
 
};
    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setPeriod(value);
    };
   
   
 
    const inputClassName = "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";
    return (
        <div>
          <label className="text-base leading-[19px] font-text mb-1">{labelText}</label>
          <div className="h-[76px] bg-gray-100 rounded-lg flex items-center p-2">
          <input
          type= "text"
            {...rest}
            ref={hourRef}
            value={hour}
            onChange={handleHourChange}
            className={cx(inputClassName, className)}
            inputMode="numeric"
            onBlur={handleInputBlur(hourRef)} // Add onBlur event handler
            placeholder="00" // Add placeholder for hours
          />
           <span className="ml-[12px] mr-3">:</span>
          <input 
          type="text"
           {...rest}
           ref={minuteRef}
           value={minute}
            onChange={handleMinuteChange}
           className={cx(inputClassName, className, "mr-2")}
           inputMode="numeric" // Show numeric keypad on mobile
           onBlur={handleInputBlur(minuteRef)} // Add onBlur event handler
           placeholder="00" // Add placeholder for minute
           />
       
       <select
          ref={periodRef}
          value={period}
          onChange={handlePeriodChange}
          className={cx(inputClassName, className, "font-text")}
          >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
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

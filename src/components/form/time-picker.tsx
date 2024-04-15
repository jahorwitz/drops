import { HTMLProps, forwardRef, useRef, useEffect} from "react";
import cx from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";
import IMask from 'imask';


type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    // onChange?:((value: string) => void);
  };

const addLeadingZero = (value: string): string => {
  return value.length === 1 ? `0${value}` : value;
};

const handleInputBlur = (ref: React.RefObject<HTMLInputElement>) => {
  return () => {
    if (ref.current) {
      const inputValue = ref.current.value.trim();
      ref.current.value = addLeadingZero(inputValue);
    }
  };
};
  export const TimePicker = forwardRef<HTMLInputElement, Props>(
    ({ labelText, hintText, feedback, className, ...rest }: Props, _ref) => {
      // const [period, setPeriod] = useState("AM");
      // Refs for hour, minute, and period input fields
     const hourRef = useRef<HTMLInputElement>(null);
     const minuteRef = useRef<HTMLInputElement>(null);
     const periodRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
      if (hourRef.current) {
        IMask(hourRef.current, {
          mask: '00', // Format for hours
          blocks: {
            '00': {
              mask: /^(?:[1-9]|1[0-2])$/,
              placeholderChar: '00',
            },
          },
         
        });
      }
      if (minuteRef.current) {
        IMask(minuteRef.current, {
          mask: '00', // Format for minutes
          blocks: {
            '00': {
              mask: /^(0?[1-9]|[1-5][0-9]|60)$/,
              placeholderChar: '00',
            },
          },
         
        });
      }
    }, []);


   

    //  // Function to handle the change of period
    //   const handleChangePeriod = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setPeriod(e.target.value);
    //   };
    
    const inputClassName = "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";
    return (
        <div>
          <label className="text-base leading-[19px] font-text mb-1">{labelText}</label>
          <div className="h-[76px] bg-gray-100 rounded-lg flex items-center p-2">
          <input
          type= "text"
            {...rest}
            ref={hourRef}
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
           className={cx(inputClassName, className, "mr-2")}
           inputMode="numeric" // Show numeric keypad on mobile
           onBlur={handleInputBlur(minuteRef)} // Add onBlur event handler
           placeholder="00" // Add placeholder for hours
           />
       
       <select
       
          // value={period}
          // onChange={handleChangePeriod}
          ref={periodRef}
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




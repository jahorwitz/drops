import {useForm } from "react-hook-form";


type TimePickerProps = {
  label?: string;
}
const TimePicker = ({ label }: TimePickerProps) => {
  const { register, formState: { errors } } = useForm();

  const inputClassName = "text-center w-[60px] h-[60px] border border-solid border-gray-400 bg-gray-100 rounded-lg";
  return (
  <div>
    <label className="text-base leading-[19px] font-text mb-1">{label}</label>
    <div className="h-[76px] bg-gray-100 rounded-lg flex items-center p-2">
     <input type="text"
  {...register('hour', {
    required: true,
    min: 0,
    max: 12,
    pattern: /^(0?[0-9]|1[0-2])$/,
})}
  className={inputClassName}/>
     <span className="ml-[12px] mr-3">:</span>
     <input type="text"
  {...register('minutes', {
    required: true,
    min: 0.0,
    max: 59,
    pattern: /^(0?[0-9]|[1-5][0-9]|60)$/,
  })} className={`${inputClassName} mr-2`}/>
     <input
          type="text"
          {...register('period', {
            required: true,
            pattern: /^(AM|PM)$/i, // Case insensitive pattern matching for AM or PM
          })}
          className={`${inputClassName} font-text`}
        />
      </div>
      {errors.hour && <p className="text-red-600 ml-2 font-text">Please enter a valid hour (00-12)</p>}
      {errors.minutes && <p className="text-red-600 ml-2 font-text">Please enter a valid minutes (00-59)</p>}
      {errors.period && <p className="text-red-600 ml-2 font-text">Please select a period (AM/PM)</p>}
    </div>
  );
};

export default TimePicker;
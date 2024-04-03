import {useForm } from "react-hook-form";

type TimePickerProps = {
  label?: string;
}
const TimePicker = ({ label }: TimePickerProps) => {
  const { register, formState: { errors } } = useForm();
  return (
    <div className="w-346 h-99">
    <label className="text-base leading-[19.2px] font-rubik mb-4">{label}</label>
    <div className="h-76 bg-gray-100 rounded-lg flex items-center p-4">
     <input type="number"
  {...register('hour', {
    required: true,
    min: 0,
    max: 12,
    pattern: /^(0?[0-9]|1[0-2])$/,
})}
  className="w-60 h-60 border border-solid border-[1px] border-gray-400 bg-gray-100 rounded-lg text-center" />
      <span className="ml-[12.5px]">:</span>
      <input type="number"
  {...register('minutes', {
    required: true,
    min: 0.0,
    max: 59,
    pattern: /^(0?[0-9]|[1-5][0-9]|60)$/,
  })} className="w-60 h-60 border border-solid border-[1px] border-gray-400 bg-gray-100 rounded-lg text-center mx-[12.5px]" />
 
        <select
          {...register('period', {required: true})}
          className="w-60 h-60 border border-solid border-[1px] border-gray-400 bg-gray-100 rounded-lg mx-[1px] text-center"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        </div>
      {errors.hour && <p className="text-red-600 ml-2">Please enter a valid hour (00-12)</p>}
      {errors.minutes && <p className="text-red-600 ml-2">Please enter a valid minutes (00-59)</p>}
      {errors.period && <p className="text-red-600 ml-2">Please select a period (AM/PM)</p>}
    </div>
  );
};

export default TimePicker;





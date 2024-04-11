import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  [key: string]: string;
};

type Option = {
  label: string;
};

export type SelectProps = {
  title: string;
  name: keyof FormData;
  options: Option[];
  placeholderValue?: string;
  description?: string;
};

export const FormSelect: React.FC<SelectProps> = ({
  title,
  name,
  options,
  placeholderValue,
  description,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (!errors[name]) {
      alert(`You have selected ${data[name]}`);
    } else {
      console.log(errors);

      alert(`Please select ${title.toLowerCase()}.`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-black max-w-pageContent w-[358px] h-auto flex flex-col	m-0 px-4">
        <label
          htmlFor={name as string}
          className="font-text font-normal text-base leading-normal pb-1"
        >
          {title}
        </label>
        <select
          id={name as string}
          {...register(name as string, { required: true })}
          defaultValue=""
          className="m-0 box-border  border shadow-sm rounded-lg grow-0 h-[60px] p-2    font-text rounded-s-lg px-3	py-5"
        >
          <option value="" disabled hidden>
            {placeholderValue}
          </option>
          {options.map((option, index) => (
            <option
              className="font-text text-base font-normal leading-none "
              key={index}
              value={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>
        {errors[name] && (
          <span className="text-base font-normal leading-none text-red">
            {description}
          </span>
        )}
      </div>
    </form>
  );
};

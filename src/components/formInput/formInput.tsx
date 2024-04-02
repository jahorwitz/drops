import { ChangeEventHandler } from "react";

type inputProps = {
  labelText?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  onChange?: ChangeEventHandler;
  value?: string;
};

export const FormInput = ({
  labelText,
  id,
  value,
  className,
  type,
  onChange,
  placeholder,
  ...rest
}: inputProps) => {
  return (
    <div className="flex flex-col gap-1 leading-5 text-base font-normal">
      <label className="font-text">{labelText}</label>
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        {...rest}
        className={`rounded-lg border-black border-[1px] py-5 px-3 font-text ${className}`}
      ></input>
    </div>
  );
};

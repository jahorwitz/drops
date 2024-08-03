import cx from "classnames";
import { HTMLProps, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }: Props, ref) => {
    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          className={cx(
            `rounded-lg border-black border-[1px] py-5 px-3`,
            className,
          )}
        />
        {feedback ? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  },
);
TextInput.displayName = "TextInput";

/* import React from 'react';
import cx from 'classnames';
import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  labelText?: string;
  hintText?: string;
  feedback?: string;
  className?: string;
  control: any;
  name: string;
}

export const DatePickerComponent = ({
  labelText,
  hintText,
  feedback,
  className,
  control,
  name,
  ...rest
}: Props) => {
  return (
    <div>
      <label className="text-base leading-[19px] font-text mb-1">{labelText}</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div>
            <DatePicker
              selected={value}
              onChange={onChange}
              className={cx("w-full p-2 border border-solid border-gray-400 rounded-lg", className)}
              {...rest}
            />
            {error && <span className="text-red text-base leading-5">{error.message}</span>}
          </div>
        )}
      />
      {feedback ? (
        <span className="text-red text-base leading-5">{feedback}</span>
      ) : hintText ? (
        <span className="text-black/60 text-base">{hintText}</span>
      ) : null}
    </div>
  );
};
 */
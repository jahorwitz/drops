import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import cx from "classnames";
import { HTMLProps, forwardRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Button } from "../button";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
    defaultValue?: number;
  };

export const NumericInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      labelText,
      hintText,
      feedback,
      className,
      defaultValue,
      name,
      onChange,
      ...rest
    }, ref
  ) => {
    const [value, setValue] = useState<number | undefined>(defaultValue);

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text relative">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          value={value}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setValue(Number(numericValue));
            onChange &&
              onChange({ target: { name, value: Number(numericValue) } });
          }}
          className={cx(
            `rounded-lg border border-black py-5 px-3 relative`,
            className
          )}
        />
        <div className="absolute top-10 right-3 flex justify-between w-[76px]">
          <Button
            variant="icon"
            className="z-1 border border-black"
            icon={faMinus as IconDefinition}
            onClick={() => {
              setValue((prev) => {
                const newVal = (prev || 0) - 1;
                onChange && onChange({ target: { name, value: newVal } });
                return newVal;
              });
            }}
          />
          <Button
            variant="icon"
            className="z-1 border border-black"
            icon={faPlus as IconDefinition}
            onClick={() => {
              setValue((prev) => {
                const newVal = (prev || 0) + 1;
                onChange && onChange({ target: { name, value: newVal } });
                return newVal;
              });
            }}
          />
        </div>
        {feedback ? (
          <span className="text-red text-base leading-5">{feedback}</span>
        ) : hintText ? (
          <span className="text-black/60 text-base">{hintText}</span>
        ) : null}
      </div>
    );
  }
);

NumericInput.displayName = "NumericInput";

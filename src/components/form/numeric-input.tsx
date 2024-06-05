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
  ({ labelText, hintText, feedback, className, defaultValue, ...rest }: Props, ref) => {
    const [value, setValue] = useState<number | undefined>(defaultValue);

    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          value={value}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setValue(Number(numericValue));
          }}
          className={cx(
            `rounded-lg border border-black py-5 px-3 relative`,
            className,
          )}
        />
        <Button
          variant="icon"
          className="absolute top-14 right-20 z-1 border border-black"
          icon={faMinus as IconDefinition}
          onClick={() => setValue((prev) => (prev || 0) - 1)}
        />
        <Button
          variant="icon"
          className="absolute top-14 right-10 z-1 border border-black"
          icon={faPlus as IconDefinition}
          onClick={() => setValue((prev) => (prev || 0) + 1)}
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

NumericInput.displayName = "NumericInput";

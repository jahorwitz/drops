import { HTMLProps, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> &
  HTMLProps<HTMLInputElement> & {
    labelText?: string;
    hintText?: string;
    feedback?: string;
    className?: string;
  };

export const AccountCreationForm = forwardRef<HTMLInputElement, Props>(
  ({ labelText, hintText, feedback, className, ...rest }: Props, ref) => {
    return (
      <div className="flex flex-col gap-1 leading-5 text-base font-normal font-text  max-w-screen-sm ">
        <label>{labelText}</label>
        <input
          {...rest}
          ref={ref}
          className="rounded-lg border-black border-[1px] py-5 px-3"
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

AccountCreationForm.displayName = "AccountCreationForm";


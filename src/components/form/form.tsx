import { FormEventHandler, ReactNode } from "react";
import { TextInput } from "./text-input";
import { WeekdaySelector } from "./weekday";
import { RadioGroup } from "./radio-group";

type Props = {
  className?: string;
  children?: ReactNode;
  onSubmit?: FormEventHandler;
};

export const Form = ({ className, children, onSubmit, ...rest }: Props) => {
  return (
    <form className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

Form.TextInput = TextInput;
Form.Weekday = WeekdaySelector;
Form.RadioGroup = RadioGroup;
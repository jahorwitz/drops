import { FormEventHandler, ReactNode } from "react";
import { TextInput } from "./text-input";
import { TimePicker } from "./time-picker";
import { WeekdaySelector } from "./weekday";
import { RadioGroup } from "./radio-group";
import { NumericInput } from "./numeric-input";
import { SelectForm } from "./select-form";
import { AddMoreSection } from "./add-more-section";
import { ListTimeInput } from "./list-time-input";

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
Form.NumericInput = NumericInput;
Form.TimePicker = TimePicker;
Form.Weekday = WeekdaySelector;
Form.RadioGroup = RadioGroup;
Form.SelectForm = SelectForm; 
Form.AddMoreSection = AddMoreSection;
Form.ListTimeInput = ListTimeInput;
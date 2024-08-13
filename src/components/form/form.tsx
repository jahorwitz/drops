import { FormEventHandler, ReactNode } from "react";
import { AccountCreationForm } from "../../routes/registration/AccountCreationForm";

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


Form.AccountCreationForm = AccountCreationForm;



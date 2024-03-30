import { FormEventHandler, ReactNode } from "react";

// Types for the props on the form
type formProps = {
  className?: string;
  children?: ReactNode; // ReactNode is anything that can be rendered in a React Component
  onSubmit?: FormEventHandler;
};

export const Form = ({ className, children, onSubmit, ...rest }: formProps) => {
  return (
    <form className={className} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

// Any created form compound components should be placed below here. Exc "Form.TextInput"

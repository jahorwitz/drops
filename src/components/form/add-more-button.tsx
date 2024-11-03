import { ReactNode } from "react";
import { Button } from "../button";

type Props = {
  buttonText?: string;
  className?: string;
  children?: ReactNode;
};

export const AddMoreButton = ({ buttonText, className, ...rest }: Props) => {
  return (
    <Button className={className} buttonText={buttonText} {...rest} />
  )
}
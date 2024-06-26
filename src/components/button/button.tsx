import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "text" | "icon";
  buttonText?: string;
  icon?: IconDefinition;
  className?: string;
};

export const Button = ({
  variant = "primary",
  buttonText = "value",
  icon,
  className,
  type = "button",
  ...rest
}: Props) => {
  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      {...rest}
      className={twMerge(
        `text-lg font-medium font-text active:opacity-60`,
        variant === "primary" &&
        "text-lightGray bg-black px-10 py-4 leading-5 rounded-lg hover:opacity-80",
        variant === "secondary" &&
        `text-black px-10 py-4 leading-5 border-black border rounded-lg hover:opacity-60`,
        variant === "text" &&
        `text-black opacity-60 py-4 leading-5 hover:opacity-90`,
        variant === "icon" &&
        `w-8 h-8 opacity-60 rounded-full hover:opacity-90`,
        className,
      )}
    >
      {icon ? <FontAwesomeIcon icon={icon} /> : buttonText}
    </button>
  );
};

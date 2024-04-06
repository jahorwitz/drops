import cx from "classnames";
import { HTMLAttributes, MouseEventHandler } from "react";

type Props = HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "text" | "icon";
  buttonText?: string;
  icon?: string;
  className?: string;
};

export const Button = ({
  variant = "primary",
  buttonText = "value",
  icon,
  className,
  ...rest
}: Props) => {
  return (
    <button 
      {...rest}
      className={cx(
        `grow-0 h-14  w-80 text-lg font-medium font-text`, 
        variant === "primary" && "text-lightGray bg-[#121212] px-10 rounded-lg",
        variant === "secondary" && `text-[#121212] bg-transparent px-10 border-[#121212] border rounded-lg`, // Styles for Secondary button
        variant === "text" && `text-[#121212] opacity-60`, 
        variant === "icon" && `w-8 h-8 `,
        className, 
      )}
    >
        {icon ? (
            <img className="p-1" src={icon}/>
        ) : ( buttonText )}
    </button>
  );
};
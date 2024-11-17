import React from "react";
import clsx from "clsx";

export interface InsightProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const baseStyles =
  "w-full max-w-md flex flex-row justify-between items-center p-4 relative bg-white shadow-md rounded rounded-3xl";

export const Insight: React.FC<InsightProps> = ({ title, message, icon }) => {
  const variantStyles = clsx(baseStyles);

  return (
    <div className={variantStyles}>
      <div className="flex flex-col gap-1 flex-grow">
        <span className="text-paragraph-lg leading-5 text-black font-medium font-text">
          {title}
        </span>
        <span className="mt-1 text-base text-black-500 break-words font-text">
          {message}
        </span>
      </div>
      <div className="flex items-center justify-between">
        {icon && <span className={`float-left`}>{icon}</span>}
      </div>
    </div>
  );
};

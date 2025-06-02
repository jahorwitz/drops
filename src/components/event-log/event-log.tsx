import React from "react";
import clsx from "clsx";

export type EventLogType = "activity" | "diet" | "medication";

export interface EventLogProps {
    type: EventLogType;
    time: string;
    actionText: string| null |undefined;
    showStatusIcon?: boolean;
    recommendedKcal? : number | null | undefined;
    // statusType?: "completed" | "missed" | "empty";
    //icon?
    completionIcon?: React.ReactNode;
    onClose?: () => void;
}

const baseStyles = 
  "w-full max-w-md flex flex-row justify-between items-center p-4 relative bg-white shadow-md rounded rounded-3xl";


const typeStyles: Record<EventLogType, string> = {
  activity: "text-blue-800",
   diet: "text-green-800",
  medication: " text-blue-800",
}
const completionIconStyles: Record<EventLogType, string> = {
  medication: "fill-yellow",
  activity:"fill-blue",
  diet:"",
}

//statusIconStyles?


export const EventLog: React.FC<EventLogProps> = ({
  time,
  actionText,
  type,
  recommendedKcal,
  // statusType,
  completionIcon
  }) => {

    const variantStyles = clsx(baseStyles, typeStyles[type])
    return (
      <div className={variantStyles}>
      <div className="flex flex-row gap-1 flex-grow">
        <span className="text-paragraph-lg text-black opacity-60 font-text">
          {time}
        </span>
        <span className="text-paragraph-lg text-black opacity-60 font-text">|</span>
        <span className="text-paragraph-lg text-black font-text">
          {actionText}
        </span>
        {type === "diet" && recommendedKcal && (
           <span className="flex items-center text-caption-text text-black opacity-60 font-text">
          {recommendedKcal} kCal recommended
        </span>
        )}
        </div>

        {(type === "activity" || type === "medication") && completionIcon && (
        <span className={clsx("ml-auto", completionIconStyles[type])}>
          {completionIcon}
        </span>)}
        
        </div>
    )
  }
import React from "react";
import clsx from 'clsx'

export type NotificationType = 'activity' | 'diet' | 'medication' | "glucose";

export interface NotificationProps {
    type: NotificationType;
    title: string;
    message: string;
    variant?: 'success' | 'warning' | "error" | 'info';
    icon?: React.ReactNode;
    onClose?: () => void;
}

const baseStyles = 'w-full max-w-md flex flex-row justify-between items-center p-4 relative bg-white shadow-md rounded rounded-3xl';

const typeStyles: Record<NotificationType, string> = {
    activity: 'text-blue-800',
    diet: 'text-green-800',
    medication: ' text-blue-800',
    glucose: 'text-gray-800'
}

const iconStyles: Record<NotificationType, string> = {
    activity: 'fill-blue',
    diet: 'fill-green',
    medication: 'fill-yellow',
    glucose: 'fill-red'
}

export const Notification: React.FC<NotificationProps> = ({
    title,
    message,
    type = "activity",
    icon,
}) => {
    const variantStyles = clsx(
        baseStyles,
        typeStyles[type],
    );

    return (
        <div className={variantStyles}>
            <div className="flex flex-col gap-1 flex-grow">
                <span className="text-xs text-gray-400 ">{title}</span>
                <span className="mt-1 text-base text-black-500 break-words">{message}</span>
            </div>
            <div className="flex items-center justify-between">
                {icon && <span className={`float-right ${iconStyles[type]}`}>{icon}</span>}
            </div>
        </div>
    )
}


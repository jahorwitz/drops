import React from 'react';
import {Notification, NotificationProps} from './notification-item'; 

export interface NotificationGroupProps {
    notifications: NotificationProps[];
    onRemove?: (index: number) => void;
}

export const NotificationGroup: React.FC<NotificationGroupProps> = ({notifications, onRemove}) => {
    return (
        <div className='space-y-4'>
            {notifications.map((notification, index) => (
            <Notification
            key={index}
            {...notification}
            onClose={onRemove ? () => onRemove(index) : undefined}
            />
             ))} 
        </div>
    );
};

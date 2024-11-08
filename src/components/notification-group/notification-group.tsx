import { PropsWithChildren } from 'react';
import { Notification } from './notification-item';

export const NotificationGroup = ({ children }: PropsWithChildren<unknown>) => {
    return (
        <div className='space-y-2'>
            {children}
        </div>
    );
};

NotificationGroup.Item = Notification;
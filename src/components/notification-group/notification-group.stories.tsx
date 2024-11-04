import { useState } from "react";
import { Meta, StoryFn } from '@storybook/react';
import { Notification, NotificationProps } from "./notification-item"
import { NotificationGroup } from "./notification-group";
import { RiCapsuleLine } from "react-icons/ri";
import { PiPersonSimpleWalk } from "react-icons/pi";
import { CiDroplet } from "react-icons/ci";
import { LuSoup } from "react-icons/lu";

export default {
    title: 'Notification',
    component: Notification,
} as Meta;

const Template: StoryFn<NotificationProps> = (args: NotificationProps) => <Notification {...args} />;

export const ActivityNotification = Template.bind({});
ActivityNotification.args = {
    type: 'activity',
    title: 'Activity',
    message: 'You have a scheduled workout at 5 PM.',
    variant: 'info',
    icon: <PiPersonSimpleWalk className="w-8 h-8 fill-blue " />
};

export const DietNotification = Template.bind({});
DietNotification.args = {
    type: 'diet',
    title: 'Diet',
    message: 'Don`t forget your evening snack.',
    variant: 'success',
    icon: <LuSoup className="w-8 h-8 fill-green" />
};


export const MedicationNotification = Template.bind({});
MedicationNotification.args = {
    type: 'medication',
    title: 'Medication',
    message: 'Time to take your evening medication.',
    variant: "warning",
    icon: <RiCapsuleLine className="w-8 h-8 fill-yellow" />
};

export const GlucoseNotification = Template.bind({});
GlucoseNotification.args = {
    type: 'glucose',
    title: 'Glucose',
    message: 'Your glucose level is low.',
    variant: 'error',
    icon: <CiDroplet className="w-8 h-8 fill-red" />
};

export const NotificationGroupStory = (args: { notifications: NotificationProps[] }) => {
    const [notifications, setNotifications] = useState(args.notifications);
    const handleRemove = (index: number) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <NotificationGroup>
            {notifications?.map((notification, index) => (
                <Notification
                    key={index}
                    {...notification}
                    onClose={() => handleRemove(index)}
                />
            ))}
        </NotificationGroup>
    )
};

NotificationGroupStory.args = {
    notifications: [
        {
            type: 'glucose',
            title: 'Glucose',
            message: 'Measure your glucose at 8:00 AM',
            variant: 'info',
            icon: <CiDroplet className="w-8 h-8 fill-red" />
        },

        {
            type: 'activity',
            title: 'Activity',
            message: 'You have a schedule workout at 5 PM.',
            variant: 'info',
            icon: <PiPersonSimpleWalk className="w-8 h-8 fill-blue " />
        },
        {
            type: 'medication',
            title: 'Medication',
            message: 'Next does of medication is at 5 PM',
            variant: 'info',
            icon: <RiCapsuleLine className="w-8 h-8 fill-yellow" />
        },
        {
            type: 'diet',
            title: 'Diet',
            message: 'You can have snack',
            variant: 'info',
            icon: <LuSoup className="w-8 h-8 fill-green" />
        },
    ]
}
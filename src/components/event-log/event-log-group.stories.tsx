import { useState } from "react";
import {Meta, StoryFn} from "@storybook/react";
import { EventLog, EventLogProps } from "./event-log";
import { EventLogGroup } from "./event-log-group";
import { IoIosCheckmarkCircle } from "react-icons/io";
// import {IoIosRadioButtonOff} from "react-icons/io"
// import { RiErrorWarningLine } from "react-icons/ri"; 

export default  {
    title: "Event Log",
    component: EventLog
} as Meta;

const Template: StoryFn<EventLogProps> = (args: EventLogProps) => (
    <EventLog {...args}/>
);

export const DietNotification = Template.bind({});
DietNotification.args = {
    type: "diet",
    time: "4pm",
    actionText: "Snack 2",
    recommendedKcal: 200,
    // showStatusIcon: false,
    completionIcon:"",
}

export const ActivityNotification = Template.bind({});
ActivityNotification.args = {
    type: "activity",
    time: "6pm",
    actionText: "yoga 1h",
    // showStatusIcon: true,
    // statusType: "empty",
    completionIcon: <IoIosCheckmarkCircle className="w-8 h-8 fill-blue"/>, 
};

export const MedicationNotification = Template.bind({});
MedicationNotification.args = {
    type:"medication",
    time: "5:30pm",
    actionText: "Insulin 4 units",
    // statusType:"empty",
    completionIcon: <IoIosCheckmarkCircle className="w-8 h-8 fill-yellow"/>,
}

export const EventLogGroupStory = (args: {
    eventLogs: EventLogProps[];
}) => {
    const [eventLogs, setEventLogs] = useState(args.eventLogs);
    const handleRemove = (index: number) => {
        setEventLogs((prev) => prev.filter((_,i) => i !== index));
    };

    return(
        <EventLogGroup>
            {eventLogs?.map((eventLog, index) => (
                <EventLog
                key={index}
                {...eventLog}
                onClose={() => handleRemove(index)}
                />
            ))

            }  
        </EventLogGroup>
    )
    };

    EventLogGroupStory.args = {
        eventLogs: [
            {
            type: "diet",
            time: "4:00pm",
            actionText: "Snack 2",
            recommendedKcal: "200"
            
            },
            {
            type: "diet",
            time: "6:00pm",
            actionText: "Meal 3",
            recommendedKcal: "1000"
            },

        ]
    }
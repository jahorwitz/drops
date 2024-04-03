import TimePicker from "./timePicker";


export default {
    title: "TimePicker",
    component: TimePicker,
    argTypes: {
        label: { control: "text"}
    }
}

export const TimePickerStory = (args: { label?: string }) => <TimePicker {...args} />;

TimePickerStory.args = {
    label: "Reminder 1",
}






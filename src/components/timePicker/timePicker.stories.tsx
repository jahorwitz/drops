import TimePicker from "./timePicker";

export default {
    title: "TimePicker",
    component: TimePicker,
    // Configuring arg types for controls in Storybook
    argTypes: {
        label: { control: "text"} // Configuring a control for the label prop
    }
}

export const TimePickerStory = (args: { label?: string }) => <TimePicker {...args} />;
// Setting initial args for the TimePickerStory
TimePickerStory.args = {
    label: "Reminder 1",
}






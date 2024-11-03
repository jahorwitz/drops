import { useState } from "react";
import { Form } from "../../components/form";
import { TimePicker } from "../../components/form/time-picker";
import { FieldValues, UseFormSetValue } from "react-hook-form";

//temporary
const dummyData = {
    currentIndex: 0,
    items: [
        {
            index: 0,
            name: "Meal 1"
        }
    ]
}
const textStyles = {
    base: "font-text text-section-subtext font-normal leading-[24px] text-center",
    reminderTitle: "font-text text-section-header font-medium leader-[38.4px] text-center max-w-[358px] mx-auto",
};

export const DietGoalReminderList : React.FC<{
    onChange: () => UseFormSetValue<FieldValues>
}> = ({onChange}) => {
    const [reminders, setReminders] = useState(dummyData);

    const addNewReminder = () => {
        const copy = {...reminders };
        copy.currentIndex = reminders.currentIndex + 1;
        copy.items.push({
            index: copy.currentIndex,
            name: `Meal ${copy.currentIndex + 1}`
        });

        setReminders(copy);
    }

    const deleteReminder = (index: number) => {
        const copy = {... reminders};
        copy.items = copy.items.filter((item) => item.index != index);

        setReminders(copy);
    }

    return (
        <div className="flex flex-col max-w-screen-md bg-lightGreen relative overflow-hidden m-auto pb-80 h-screen">
            <div className="flex flex-col gap-8 items-center pt-32">
                <h1 className={textStyles.reminderTitle}>
                     Set your diet goals reminders
                 </h1>
                 <div className="bg-white w-96 p-3 rounded-2xl flex flex-col" >
                    <Form className="flex flex-col gap-5">
                        {
                            reminders.items.map((item) => {
                                return (
                                    //@ts-expect-error, timepicker currently requires onChange and onBlur but it does not use passed functions
                                    <TimePicker
                                        key={item.index}
                                        name={"Set Diet Goal Reminder"}
                                        setValue={onChange}
                                        labelText={`${item.name} reminder`}
                                        className="bg-lightGray mx-0" handleDelete={() => {deleteReminder(item.index)}}>
                                    </TimePicker>
                                )
                            })
                        }
                    </Form>
                    
                    <button className="self-center text-[#121212]/60 text-lg font-medium mt-[20px] mb-1" onClick={addNewReminder}>+ Add More</button>
                 </div>
                 
            </div>
        </div>
    );
}
import { useState } from "react";
import { Form } from "../../components/form";
import { TimePicker } from "../../components/form/time-picker";

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

function DietGoalReminderList() {
    const [reminders, setReminders] = useState(dummyData)

    const onChange = () => {
        console.log("onChange");

        return Promise.resolve();
    }

    const onClick = () => {
        console.log("onClick");
    }

    const addNewReminder = () => {
        const copy = {...reminders }
        copy.currentIndex = reminders.currentIndex + 1;
        copy.items.push({
            index: copy.currentIndex,
            name: `Meal ${copy.currentIndex + 1}`
        });

        setReminders(copy);
    }

    return (
        <div className="flex flex-col max-w-screen-md bg-lightGreen relative overflow-hidden m-auto pb-80 h-screen">
            <div className="flex flex-col gap-8 items-center pt-32">
                <h1 className={textStyles.reminderTitle}>
                     Set your diet goals reminders
                 </h1>
                 <div onChange={onChange} className="bg-white w-96 p-3 rounded-2xl flex flex-col" >
                    <Form className="flex flex-col gap-5">
                        {
                            reminders.items.map((item) => {
                                return (
                                    <TimePicker
                                        key={item.index}
                                        name={"Set Diet Goal Reminder"}
                                        setValue={onClick}
                                        labelText={`${item.name} reminder`}
                                        className="bg-lightGray mx-0" onChange={onChange} onBlur={onChange}>
                                    </TimePicker>
                                )
                            })
                        }
                    </Form>
                    
                    <button className="self-center text-[#121212]/60 text-lg font-medium mt-[20px] mb-1" onClick={addNewReminder}>+ Add More</button>
                 </div>
                 
            </div>
        </div>
    )


}

export default DietGoalReminderList;
import { TimePicker } from "../../components/form/time-picker";
import DeleteIcon from "../../images/delete-icon.svg";

const textStyles = {
    base: "font-text text-section-subtext font-normal leading-[24px] text-center",
    reminderTitle: "font-text text-section-header font-medium leader-[38.4px] text-center max-w-[358px] mx-auto",
};

function DietGoalReminderList() {
    const onChange = () => {
        console.log("onChange");
    }

    const onClick = () => {
        console.log("onClick");
    }

    return (
        <div className="flex flex-col max-w-screen-md bg-lightGreen relative overflow-hidden m-auto pb-80 h-screen">
            <div className="flex flex-col gap-6 items-center pt-32">
                <h1 className={textStyles.reminderTitle}>
                     Set your diet goals reminders
                 </h1>
                 <div onChange={onChange} className="bg-white w-96" >
                
                 <TimePicker
                    name={"Set Diet Goal Reminder"}
                    setValue={onClick}
                    labelText={"Meal 1 Reminder"}
                    className="bg-lightGray"
                    >
                    </TimePicker>
                    <img src={DeleteIcon} alt="delete" />
                    <button>+ Add More</button>
               
                  
                 </div>
                 
            </div>
        </div>
    )


}

export default DietGoalReminderList;
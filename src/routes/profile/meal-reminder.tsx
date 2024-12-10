import { Form } from "../../components"
import CompactTimePicker from "../../components/form/compact-time-picker"


const MealReminder = () => {
    //something something context;

    return (
        <div className="bg-white rounded-2xl p-3 flex flex-col gap-4">
            <h2 className="font-medium text-xl leading-6">Meal Reminders</h2>
            {/* throw into it's own component when done*/}
            <Form.AddMoreSection buttonText="+ Add more">
                <CompactTimePicker label={"Meal"} onEdit={() => {console.log('editing')}}/>
            </Form.AddMoreSection>
            
        </div>
    )
}

export default MealReminder
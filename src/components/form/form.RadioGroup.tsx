import { Form } from "./form";
import { useForm } from 'react-hook-form';

type FormData = {
    diabetesType: string;
};

const DiabetesForm = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        if (!errors.diabetesType) {
        alert(`You selected ${data.diabetesType}`)
        } else {
            alert( 'Please select a diabetes type');
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <p>Choose your diabetes type</p>
            <div {...register('diabetesType', {required: true})}>
                <label>
                    <input type= "radio" value= "Type 1"/>
                    Type 1
                </label>
                <label>
                    <input type= "radio" value= "Type 2"/>
                    Type 2
                </label>
                <label>
                    <input type= "radio" value= "Gestational"/>
                    Gestational
                </label>
            </div>
            <p className="hint-text">Select the type that best matches you diagnosis.</p>
        </Form>
    );
};

export default DiabetesForm;

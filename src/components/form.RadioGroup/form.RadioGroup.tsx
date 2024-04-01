import { Form } from "../form";
import { useForm } from 'react-hook-form';

type FormData = {
    diabetesType: string;
};


type DiabetesFormProps = {
    title: string;
    description: string;
    options: string[];
}

const DiabetesForm = ({title, description, options}: DiabetesFormProps) => {
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
            <p>{title}</p>
            <div {...register('diabetesType', {required: true})}>
                {options.map((option, index) => (
                    <label key={index}>
                        <input type="radio" value={option}/>
                        {option}
                    </label>
                ))}
            </div>
            <p className="hint-text">{description}</p>
        </Form>
    );
};

export default DiabetesForm;


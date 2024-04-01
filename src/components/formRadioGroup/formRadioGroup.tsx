import { Form } from "../form";
import { useForm } from 'react-hook-form';

type FormData = {
    inputText: string;
};


type RadioGroupProps = {
    title: string;
    description: string;
    options: string[];
}

export const RadioGroup = ({title, description, options}: RadioGroupProps) => {
    const {register, handleSubmit, formState: { errors }} = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        if (!errors.inputText) {
        alert(`You selected ${data.inputText}`)
        } else {
            alert( 'Please select an option');
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <p>{title}</p>
            <div {...register('inputText', {required: true})}>
                {options.map((option, index) => (
                    <label key={index}>
                        <input type="radio" value={option}>
                        {option}
                        </input>
                    </label>
                ))}
            </div>
            <p className="hint-text">{description}</p>
        </Form>
    );
};
import { Form } from "../form";
import { useForm } from 'react-hook-form';

// Generic Types: The FormData type now has a selectedOption field instead of inputText.
type FormData = {
    selectedOption: string;
};

// Generic Types: The options prop now accepts an array of objects, each with a value and label.
type Option = {
    value: string;
    label: string;
};


type RadioGroupProps = {
    title: string;
    description: string;
    options: Option[];
}

export const RadioGroup = ({title, description, options}: RadioGroupProps) => {
    const { handleSubmit, formState: { errors }} = useForm<FormData>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const onSubmit = () => {
        if (!errors?.inputText && selectedOption !== null) {
            alert(`You selected ${selectedOption}`);
        } else {
            alert('Please select an option');
        }
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-3 text-black max-w-pageContent w-86 h-auto">
            <p className="section-subtext">{title}</p>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="font-text flex items-center space-x-2 border-2 border-lightGray rounded-lg p-3 text-paragraph-lg"  style={{
                        borderColor: selectedOption === option ? '#121212' : '#f5f5f5',
                    }}>
                        <input 
                            type="radio" 
                            value={option.value} 
                            checked={selectedOption === option.value}
                            onChange={(e) => {
                            handleOptionChange(e.target.value);
                            if (onChange) onChange(e);
                        }}
                            {...rest}
                            className={`appearance-none h-4 w-4 border-4 bold-border-black rounded-full checked:border-black focus:outline-none focus:ring 1 focus:ring-black ${selectedOption === option.value ? 'bg-white border-black' : 'bg-white border-lightGray'}`}
                        />

                        <span className="text-paragraph-lg text-black-400">{option.label}</span>
                    </label>
                ))}
            </div>
            <p className="text-paragraph-lg text-lightGray-400 font-text">{description}</p>
        </Form>
    );
};
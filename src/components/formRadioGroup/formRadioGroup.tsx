import { useForm } from 'react-hook-form';
import { useState } from 'react';

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
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Error Handling: The onSubmit function now displays more specific error messages based on the errors object.
    const onSubmit = (data: FormData) => {
        if (errors.selectedOption) {
            alert(errors.selectedOption.message);
        } else {
            alert(`You selected ${data.selectedOption}`);
        }
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const { onChange, ...rest } = register("selectedOption", { required: "Please select an option" });

    return (
       <div>
            <p className="section-subtext font-text">{title}</p>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="font-text flex items-center space-x-2 border-2 border-lightGray rounded-lg p-3 text-paragraph-lg"  style={{
                        borderColor: selectedOption === option.value ? '#121212' : '#f5f5f5',
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
            {errors.selectedOption && <p>{errors.selectedOption.message}</p>}
       </div>
    );
};
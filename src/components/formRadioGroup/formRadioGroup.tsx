import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    title?: string;
    description?: string;
    options: {
        value: string;
        label: string;
    }[];
    errors: React.ReactNode;
    selectedOption: string | null;
    register: UseFormRegisterReturn;
};

export const RadioGroup = ({ title, description, options, errors, selectedOption }: Props) => {
    return (
        <div>
            <p className="section-subtext font-text">{title}</p>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="font-text flex items-center space-x-2 border-2 border-lightGray rounded-lg p-3 text-paragraph-lg" style={{
                        borderColor: selectedOption === option.value ? '#121212' : '#f5f5f5',
                    }}>
                        <input
                            type="radio"
                            value={option.value}
                            checked={selectedOption === option.value}
                            required
                            className={`appearance-none h-4 w-4 border-4 bold-border-black rounded-full checked:border-black focus:outline-none focus:ring 1 focus:ring-black ${selectedOption === option.value ? 'bg-white border-black' : 'bg-white border-lightGray'}`}
                        />
                        <span className="text-paragraph-lg text-black-400">{option.label}</span>
                    </label>
                ))}
            </div>
            <p className="text-paragraph-lg text-lightGray-400 font-text">{description}</p>
            {errors && <p>Error: {errors}</p>}
        </div>
    );
};

RadioGroup.displayName = "RadioGroup";




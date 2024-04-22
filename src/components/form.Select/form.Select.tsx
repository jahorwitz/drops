import { Form } from "../form/form";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

export type SelectProps = {
  title: string;
  placeholderValue: string;
  hintText: string;
  options: string[]; // Array of options
};

const FormSelect = ({
  title,
  placeholderValue,
  hintText,
  options,
}: SelectProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [selectedOption, setSelectedOption] = useState(""); // State to track selected option

  const onSubmit = () => {
    if (!selectedOption) {
      setError("selectedOption", {
        message: "Please select an option",
      });
    } else {
      clearErrors("selectedOption");
      console.log(selectedOption); // Log selected option value
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Update selected option
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-black max-w-pageContent w-[358px] h-auto flex flex-col m-0 px-4">
        <label className="font-text font-normal text-base leading-normal pb-1">
          {title}
        </label>
        <select
          {...register("selectedOption")} // Register select input with react-hook-form
          className="m-0 box-border border shadow-sm rounded-lg grow-0 h-[60px] p-2 font-text rounded-s-lg px-3 py-5"
          value={selectedOption || ""} // Set selected option
          onChange={handleChange} // Handle option change
        >
          <option value="" disabled hidden>
            {placeholderValue}
          </option>

          {options.map((option) =>
            (selectedOption !== "" && option !== placeholderValue) ||
            selectedOption === "" ? (
              <option
                className="font-text text-base font-normal leading-none"
                key={option}
                value={option}
              >
                {option}
              </option>
            ) : null,
          )}
        </select>
        {errors.selectedOption && (
          <span className="text-red">
            {errors.selectedOption.message?.toString()}
          </span>
        )}

        {hintText && <span className="text-black/60 text-sm">{hintText}</span>}
      </div>
    </Form>
  );
};

export default FormSelect;

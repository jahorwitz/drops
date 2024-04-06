import { useForm } from "react-hook-form";
import { Form } from "../form/form";

type FormData = {
  [key: string]: string;
};

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  title: string;
  name: keyof FormData;
  options: Option[];
  placeholderValue?: string;
};

const FormSelect = ({
  title,
  name,
  options,
  placeholderValue = "Choose",
}: SelectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (!errors[name]) {
      alert(`You have selected ${data[name]}`);
    } else {
      alert(`Please select ${title.toLowerCase()}.`);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className=" text-black max-w-pageContent w-86 h-auto flex flex-col	m-0 px-4	"
    >
      <label htmlFor={name as string} className=" font-text">
        {title}
      </label>{" "}
      <select
        id={name as string}
        {...register(name as string, { required: true })}
        defaultValue=""
        className="m-0 box-border  border shadow-sm rounded-lg grow-0 h-14 p-2  w-80  font-text"
      >
        <option className="opacity-50	" value="" disabled hidden>
          {placeholderValue}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Form>
  );
};

export default FormSelect;

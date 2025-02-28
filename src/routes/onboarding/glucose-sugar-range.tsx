import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components";

type Props = {
  onChange: (values: Record<string, number>) => void;
};

interface MyFormValues {
  fastingMin: number;
  fastingMax: number;
  postprandialMin: number;
  postprandialMax: number;
}

export const GlucoseSugarRange = ({ onChange = () => {} }: Props) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<MyFormValues>({
    defaultValues: {
      fastingMin: 70,
      fastingMax: 100,
      postprandialMin: 100,
      postprandialMax: 180,
    },
    mode: "onChange",
  });

  const fastingMin = watch("fastingMin");
  const fastingMax = watch("fastingMax");
  const postprandialMin = watch("postprandialMin");
  const postprandialMax = watch("postprandialMax");

  useEffect(() => {
    onChange({
      fastingMin,
      fastingMax,
      postprandialMin,
      postprandialMax,
    });
  }, [fastingMin, fastingMax, postprandialMin, postprandialMax, onChange]);

  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pt-[15.5px] pr-[10px] pl-[10px] pb-[32px] h-screen">
      <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto mb-[20px]">
        First, let’s set your desired glucose levels
      </h2>
      <p className=" flex flex-col items-center gap-5 font-text font-normal leading-[16px] text-center text-black/60 leading-[19.2px] text-paragraph-lg">
        We’ve selected these ranges based on general healthcare recommendations
      </p>
      <Form>
        <div className="flex flex-col bg-white w-full px-3  mt-8 h-fit  max-h-[900px] py-4 self-center rounded-3xl">
          <h3 className="text-left mb-[16px] text-[20px] leading-[24px] font-medium font-text">
            Fasting blood sugar range
          </h3>
          <div className="flex justify-evenly gap-[12px]">
            <Form.TextInput
              className="text-center w-[100%]"
              labelText="Min. value (in Mg/Dl)"
              feedback={errors.fastingMin?.message}
              filled={`${!watch("fastingMin") ? "filled" : ""}`}
              {...register("fastingMin", {
                required: "This field is required",
                maxLength: { value: 4, message: "No more than 4 characters" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "This field must contain only numbers",
                },
              })}
            />
            <Form.TextInput
              className="text-center w-[100%]"
              labelText="Max. value (in Mg/Dl)"
              feedback={errors.fastingMax?.message}
              filled={`${!watch("fastingMax") ? "filled" : ""}`}
              {...register("fastingMax", {
                required: "This field is required",
                maxLength: { value: 4, message: "No more than 4 characters" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "This field must contain only numbers",
                },
              })}
            />
          </div>
        </div>
        <div className="flex flex-col bg-white w-full px-3  mt-8 h-fit  max-h-[900px] py-4 self-center rounded-3xl">
          <h3 className="text-left mb-[16px] text-[20px] leading-[24px] font-medium font-text">
            Postprandial (after meals) blood sugar range
          </h3>
          <div className="flex justify-evenly gap-[12px]">
            <Form.TextInput
              className="text-center w-[100%]"
              labelText="Min. value (in Mg/Dl)"
              feedback={errors.postprandialMin?.message}
              filled={`${!watch("postprandialMin") ? "filled" : ""}`}
              {...register("postprandialMin", {
                required: "This field is required",
                maxLength: { value: 4, message: "No more than 4 characters" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "This field must contain only numbers",
                },
              })}
            />
            <Form.TextInput
              className="text-center w-[100%]"
              labelText="Max. value (in Mg/Dl)"
              feedback={errors.postprandialMax?.message}
              filled={`${!watch("postprandialMax") ? "filled" : ""}`}
              {...register("postprandialMax", {
                required: "This field is required",
                maxLength: { value: 4, message: "No more than 4 characters" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "This field must contain only numbers",
                },
              })}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

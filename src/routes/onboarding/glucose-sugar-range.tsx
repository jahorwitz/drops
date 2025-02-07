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
    //handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MyFormValues>({
    defaultValues: {
      fastingMin: 70,
      fastingMax: 100,
      postprandialMin: 100,
      postprandialMax: 180,
    },
  });

  const fastingMin = watch("fastingMin");
  const fastingMax = watch("fastingMax");
  const postprandialMin = watch("postprandialMin");
  const postprandialMax = watch("postprandialMax");
  //   const [min, setMin] = useState("");
  //   const [max, setMax] = useState("");

  //   const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     setMin(e.target.value);
  //   };

  //   const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     setMax(e.target.value);
  //   };

  useEffect(() => {
    onChange({
      fastingMin,
      fastingMax,
      postprandialMin,
      postprandialMax,
    });
  }, [fastingMin, fastingMax, postprandialMin, postprandialMax, onChange]);
  {
    /* <input onChange={handleMinChange} value={min} />
      <input onChange={handleMaxChange} value={max} /> */
  }
  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pt-[15.5px] pr-[10px] pl-[10px] pb-[32px] h-screen">
      <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto mb-[20px]">
        First, lest’s set your desired glucose levels
      </h2>
      <p className=" flex flex-col items-center gap-5 font-text text-section-subtext font-normal leading-[16px] text-center text-black/60 text-[16px]">
        We’ve selected these ranges based on general healthcare recommendations
      </p>
      <Form>
        <div className="flex flex-col bg-white w-full px-3  mt-8 h-fit  max-h-[900px] py-4 self-center rounded-3xl">
          <h3 className="text-left mb-[16px] text-[20px] leading-[24px] font-medium">
            Fasting blood sugar range
          </h3>
          <div className="flex justify-evenly gap-[12px]">
            <Form.TextInput
              className="text-center w-[100%]"
              // style={{ textAlign: "center" }}
              labelText="Min. value (in Mg/Dl)"
              feedback={errors.fastingMin?.message}
              filled={`${!watch("fastingMin") ? "filled" : ""}`}
              {...register("fastingMin", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "This field must be at least 5 characters long",
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
                minLength: {
                  value: 5,
                  message: "This field must be at least 5 characters long",
                },
              })}
            />
          </div>
        </div>
        <div className="flex flex-col bg-white w-full px-3  mt-8 h-fit  max-h-[900px] py-4 self-center rounded-3xl">
          <h3 className="text-left mb-[16px] text-[20px] leading-[24px] font-medium">
            Postprandial (after meals) blood sugar range
          </h3>
          <div className="flex justify-evenly gap-[12px]">
            <Form.TextInput
              className="text-center w-[100%]"
              // style={{ textAlign: "center" }}
              labelText="Min. value (in Mg/Dl)"
              feedback={errors.postprandialMin?.message}
              filled={`${!watch("postprandialMin") ? "filled" : ""}`}
              {...register("postprandialMin", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "This field must be at least 5 characters long",
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
                minLength: {
                  value: 5,
                  message: "This field must be at least 5 characters long",
                },
              })}
            />
          </div>
        </div>
      </Form>
      {/* <form
        action=""
        className="w-full gap-5 bg-white pt-[16px] pr-[12px] pb-[16px] pl-[12px] rounded-lg flex flex-col my-19"
      >
        <label htmlFor="" className="text-left">
          {title}
        </label>
        <div className="flex leading-[16px] gap-[12px]">
          <label className="text-[16px] Minleading-[16px]">
            Min. value (in Mg/Dl)
            <input
              id="min"
              value={minValue}
              className="Minleading-[16px] max-w-[167px]  h-[60px] border border-black text-center rounded-[8px]"
            />
          </label>
          <label className="text-[16px] Minleading-[16px]">
            Max. value (in Mg/Dl)
            <input
              id="max"
              value={maxValue}
              className="Minleading-[16px] max-w-[167px]  h-[60px] border-[1px] border-black text-center rounded-[8px]"
            />
          </label>
        </div>
      </form> */}
    </div>
  );
};
/* Fasting blood sugar range */

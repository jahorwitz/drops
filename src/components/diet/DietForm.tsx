import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { NumericInput } from "../../components/form/numeric-input";
import ExitIcon from "../../images/Close-Icon.png";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_DIET } from "../../graphql/queries/diet";
import { CREATE_DIET, UPDATE_DIET } from "../../graphql/mutations/diet";
import { useEffect } from "react";

const defaultDietFields = {
  mealsPerDay: 0,
  snacksPerDay: 0,
  carbsPerDay: 0,
  fiberPerDay: 0,
  waterPerDay: 0,
  calorieLimit: 0,
};

export const DietForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const { data } = useQuery(GET_USER_DIET);
  const diet = data?.authenticatedItem?.diet;
  // Check if the user already has a saved diet entry

  const isExisting = Boolean(diet?.id);

  const [createDiet] = useMutation(CREATE_DIET, {
    refetchQueries: ["GetUserDiet"],
  });

  const [updateDiet] = useMutation(UPDATE_DIET, {
    refetchQueries: ["GetUserDiet"],
  });

  // Setup form state with default diet values


  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: defaultDietFields,
    mode: "onChange",
    shouldUnregister: false,
  });


  // Set form values when diet is loaded (avoids blank form)

  useEffect(() => {
    if (diet) {
      reset({
        mealsPerDay: diet.mealsPerDay ?? 0,
        snacksPerDay: diet.snacksPerDay ?? 0,
        carbsPerDay: diet.carbsPerDay ?? 0,
        fiberPerDay: diet.fiberPerDay ?? 0,
        waterPerDay: diet.waterPerDay ?? 0,
        calorieLimit: diet.calorieLimit ?? 0,
      });
    }
  }, [diet, reset]);

  // Handles both creation and updating based on diet existence

  const onSubmit = async (formData: typeof defaultDietFields) => {
    try {
      const variables = { data: formData };
      if (isExisting) {
        await updateDiet({ variables: { ...variables, where: { id: diet.id } } });
      } else {
        await createDiet({ variables });
      }
      toggleForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Diet form submit failed:", err.message);
      } else {
        console.error("Diet form submit failed:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-2xl px-4 pt-4 pb-4 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold font-text">Edit Diet Goals</h2>
          <img
            src={ExitIcon}
            alt="Close"
            className="cursor-pointer w-5 h-5"
            onClick={toggleForm}
          />
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <NumericInput labelText="Meals per day" {...register("mealsPerDay")}/>
          <NumericInput labelText="Snacks per day" {...register("snacksPerDay")}/>
          <NumericInput labelText="Carbs per day (grams)" {...register("carbsPerDay")}/>
          <NumericInput labelText="Fiber per day (grams)" {...register("fiberPerDay")}/>
          <NumericInput labelText="Cups of water per day" {...register("waterPerDay")}/>
          <NumericInput labelText="Calorie limit" {...register("calorieLimit")}/>

          <Button
            type="submit"
            buttonText="Save"
            variant="primary"
            disabled={!isValid}
            className="w-full h-11 rounded-xl bg-black text-white mt-2"
          />
        </form>
      </div>
    </div>
  );
};

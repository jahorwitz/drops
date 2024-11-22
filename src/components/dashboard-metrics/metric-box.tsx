//TODO: remove static image imports when dynamic graphs are in place
import glucoseImage from "../../images/metric-image-glucose.svg";
import activityImage from "../../images/metric-image-activity.svg";
import dietImage from "../../images/metric-image-diet.svg";
import moodImage from "../../images/metric-image-mood.svg";

interface MetricBoxProps {
  variant: string;
  boxColor?: string;
  promptVisible?: boolean;
}

//TODO: import array of saved medication reminders or the reminder that is coming up next
const medicationTimes = ["4:30p"];

export const MetricBox = ({
  variant,
  promptVisible = false,
  boxColor = "Pink",
}: MetricBoxProps) => {
  return (
    <div
      className={`bg-light${boxColor} h-[160px] metric-card box-content rounded-2xl overflow-hidden p-[10px] relative`}
    >
      <h4 className="font-text text-section-subtext font-medium leading-[24px] mb-2">
        {variant}
      </h4>
      <p className="font-text text-black opacity-60 max-w-[140px] leading-[19.2px]">
        {(variant === "Glucose" &&
          (promptVisible
            ? "Set up reminders to measure glucose"
            : "Measure at 4PM")) ||
          (variant === "Medication" &&
            (promptVisible
              ? "Set up your medication to keep track of it"
              : "Insulin 4 units at 4:30 PM")) ||
          (variant === "Diet" &&
            (promptVisible
              ? "Set up your diet goals to keep track of them"
              : "Have a snack at 5:30 PM")) ||
          (variant === "Activity" &&
            (promptVisible
              ? "Set up your activity goals to keep track of them"
              : "Excercise at 6 PM")) ||
          (variant === "Mood" && "Record how you feel today")}
      </p>
      <img
        //TODO: replace static images with dynamic graphs
        src={
          !promptVisible
            ? (variant === "Glucose" && glucoseImage) ||
              (variant === "Diet" && dietImage) ||
              (variant === "Activity" && activityImage) ||
              (variant === "Mood" && moodImage) ||
              undefined
            : undefined
        }
        className="absolute left-0 bottom-0"
      ></img>
      <p
        className={`font-bold text-medication-reminder font-text bg-gradient-to-b from-yellow bg-clip-text text-transparent absolute -bottom-2 left-0 leading-[76.8px] ${
          variant === "Medication" ? "block" : "hidden"
        }`}
      >
        {medicationTimes[0]}
      </p>
      <button
        className={`absolute bottom-[10px] right-[10px] ${
          variant !== "Medication" ? "block" : "hidden"
        } `}
      >
        <div className="relative flex items-center justify-center w-6 h-6 bg-white rounded-full">
          <div className="absolute w-3/4 h-[2px] bg-black"></div>
          <div className="absolute h-3/4 w-[2px] bg-black"></div>
        </div>
      </button>
    </div>
  );
};

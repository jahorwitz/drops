interface MetricBoxProps {
  variant: "Glucose" | "Medication" | "Activity" | "Mood" | "Diet";
  boxColor?: "Yellow" | "Blue" | "Pink" | "Green" | "Purple";
  promptVisible?: boolean;
}

export const MetricBox = ({
  variant,
  promptVisible = true,
  boxColor = "Pink",
}: MetricBoxProps) => {
  return (
    <div
      className={`bg-light${boxColor} h-[180px] metric-card box-content rounded-2xl p-[10px] relative`}
    >
      <h4 className="font-text text-section-subtext font-medium leading-[24px] mb-2">
        {variant}
      </h4>
      <p className="font-text text-black opacity-60 max-w-[140px] leading-[19.2px]">
        {promptVisible &&
          (variant === "Glucose"
            ? "Set up reminders to measure glucose"
            : variant === "Medication"
            ? "Set up your medication to keep track of it"
            : variant === "Diet"
            ? "Set up your diet goals to keep track of them"
            : variant === "Activity"
            ? "Set up your activity goals to keep track of them"
            : variant === "Mood"
            ? "Record how you feel today"
            : "")}
      </p>
      <button className="absolute bottom-[10px] right-[10px]">+</button>
    </div>
  );
};

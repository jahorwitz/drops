interface MetricBoxProps {
  variant: "glucose" | "medication" | "activity" | "mood" | "diet";
  promptVisible?: boolean;
}

export const MetricBox = ({
  variant,
  promptVisible = true,
}: MetricBoxProps) => {
  console.log(variant, promptVisible);
  return (
    <div>
      <div className="bg-lightPink h-[180px] w-[180px] box-content rounded-2xl p-[10px] relative">
        <h4 className="font-text text-section-subtext font-medium leading-[24px] mb-2">
          Glucose
        </h4>
        <p className="font-text text-black opacity-60 max-w-[140px] leading-[19.2px]">
          Set up reminders to measure glucose
        </p>
        <button className="absolute bottom-[10px] right-[10px]">+</button>
      </div>
    </div>
  );
};

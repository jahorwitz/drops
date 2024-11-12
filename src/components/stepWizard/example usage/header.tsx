import { useStepWizard } from "../Steps";

const Header = () => {
  const { currentStep, totalSteps } = useStepWizard();
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="w-[86.6px] h-[46px]">Drops Care</h1>
        <span className="font-text text-black/60 font-paragraph-lg">
          Title • Step {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
};

export default Header;

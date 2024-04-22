import logo from "./droplogo.svg";
import { ButtonPrimary } from "../button/button";
// bg-lightYellow

export const WelcomeScreeen = () => {
  const textstyles = "font-text text-section-subtext font-normal leading-6";
  return (
    <div>
      <div className="absolute z-[-1] inset-0 w-0 h-0 border-l-[500px] border-r-[500px] border-l-transparent  border-r-transparent border-b-[800px] border-darkYellow rounded-[50%]"></div>

      <div className="min-h-screen w-screen">
        <div className="text-center">
          <img src={logo} alt="Logo" className="mx-auto  w-88 h-112.27" />
          <h1 className="font-text pt-20 text-welcome-title font-medium leading-[52.8px]">
            Overcome
            <br /> the struggles <br />
            of diabetes
          </h1>
          <div className="flex flex-col pt-10 pb-20 justify-center align-center gap-y-3">
            <p className={textstyles}>
              Track glucose, diet, activity, <br /> medication & mood
            </p>
            <p className={textstyles}>Get useful insights</p>
            <p className={textstyles}>
              Easily share data with medical specialists
            </p>
          </div>

          <div className=" flex flex-col gap-3 justify-center items-center">
            <ButtonPrimary buttonText="Register" />
            <ButtonPrimary buttonText="Login" />
          </div>
        </div>
        {/* <div className="absolute z-[-1] inset-0 w-0 h-0 border-l-[500px] border-r-[500px] border-l-transparent  border-r-transparent border-b-[800px] border-darkYellow rounded-[50%]"></div> */}
      </div>
    </div>
  );
};

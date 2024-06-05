import React from "react";
import logo from "./droplogo.svg";
import bgimg from "./bgimg.svg";
import { Button } from "../button";

const textStyles = {
  base: "font-text text-section-subtext font-normal leading-[24px] text-center",
  welcomeTitle:
    "font-text text-welcome-title font-medium leading-[52.8px] text-center max-w-[358px] mx-auto",
  buttonStyles: "w-[358px] h-[60px] rounded-tl-8 max-w-full",
};

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightYellow max-w-screen-sm pb-8 relative overflow-hidden m-auto">
      <img
        src={bgimg}
        alt="Background image"
        className="absolute inset-x-0 w-full h-[680px]"
      />
      <div className="z-10">
        <img
          src={logo}
          alt="Drop Logo"
          className="w-20 h-[104.27px] mt-10 mx-auto z-1"
        />

        <div className="flex flex-col gap-10 items-center pt-20">
          <h2 className={textStyles.welcomeTitle}>
            Overcome <br /> the struggles <br /> of diabetes
          </h2>

          <div className="w-[346px] flex flex-col items-center gap-y-3">
            <p className={textStyles.base}>
              Track glucose, diet, activity, medication & mood
            </p>
            <p className={textStyles.base}>Get useful insights</p>
            <p className={textStyles.base}>
              Easily share data with medical specialists
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 pt-20">
          <Button
            className={textStyles.buttonStyles}
            variant="primary"
            buttonText="Register"
            onClick={() => alert("I'm Register button")}
          />
          <Button
            className={textStyles.buttonStyles}
            variant="secondary"
            buttonText="Login"
            onClick={() => alert("I'm Login button")}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

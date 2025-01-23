import React from "react";
import logo from "../../images/Logo.svg";
import cover from "../../images/Polygon.svg";
import backbutton from "../../images/Backbutton.svg";
import { Link } from "react-router-dom";

export const RegistrationConfirmation: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightYellow max-w-screen-md relative overflow-hidden m-auto pb-80 h-screen">
      <img
        src={cover}
        alt="Background image"
        className="absolute inset-x-0 w-full h-[700px] 
          "
      />
      <div className="z-10 mt-12 ml-5">
        <Link to="/welcome">
          <img src={backbutton} />
        </Link>
      </div>
      <div className="z-10 ">
        <img
          src={logo}
          alt="Drop Logo"
          className="w-20 h-[112.27px]  mx-auto z-1 mt-3"
        />

        <div className="flex flex-col gap-5 items-center pt-32">
          <h2 className="font-text text-section-header font-medium leading-[52.8px] text-center max-w-[362px] mx-auto">
            Almost there!
            <br /> We've sent you an email
            <br /> with confirmation link <link rel="stylesheet" href="" />
          </h2>

          <div className="w-[346px] flex flex-col items-center gap-y-3 ">
            <p className="font-text text-section-subtext font-normal leading-[24px] text-center">
              Open it to confirm your account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

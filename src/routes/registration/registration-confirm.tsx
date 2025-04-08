import React from "react";
import logo from "../../images/Logo.svg";
import cover from "../../images/Polygon.svg";
import backbutton from "../../images/Backbutton.svg";
import { Link } from "react-router-dom";
import { Button } from "../../components";

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
            Youre account has been confirmed!
            <br /> Please follow the link below{" "}
            <link rel="stylesheet" href="" />
          </h2>

          <div className="w-[346px] flex flex-col items-center gap-y-3 ">
            <Link to="/dashboard">
              <Button
                type="submit"
                buttonText="You're now registered"
                variant="primary"
                className="h-[60px] w-full mt-24 mb-8"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

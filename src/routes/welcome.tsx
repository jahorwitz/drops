import React from "react";
import logo from "../images/Logo.svg";
import cover from "../images/Polygon.svg";
import { Link } from "react-router-dom";
import { Button } from "../components";

export const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightYellow max-w-screen-md pb-8 relative overflow-hidden m-auto h-screen">
      <img
        src={cover}
        alt="Background image"
        className="absolute inset-x-0 w-full h-[700px] 
        "
      />
      <div className="z-10">
        <img
          src={logo}
          alt="Drop Logo"
          className="w-20 h-[112.27px] mt-14 mx-auto z-1"
        />

        <div className="flex flex-col gap-10 items-center pt-20">
          <h2 className="font-text text-welcome-title font-medium leading-[52.8px] text-center max-w-[358px] mx-auto">
            Overcome <br /> the struggles <br /> of diabetes
          </h2>

          <div className="w-[346px] flex flex-col items-center gap-y-3 font-text text-section-subtext font-normal leading-[24px] text-center">
            <p>Track glucose, diet, activity, medication & mood</p>
            <p>Get useful insights</p>
            <p>Easily share data with medical specialists</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 pt-20">
          <Link to="/register">
            <Button
              className="w-[358px] h-[60px] rounded-tl-8 max-w-full"
              variant="primary"
              buttonText="Register"
              onClick={() => alert("Register button")}
            />
          </Link>
          <Link to="/login">
            <Button
              className="w-[358px] h-[60px] rounded-tl-8 max-w-full"
              variant="secondary"
              buttonText="Log In"
              onClick={() => alert("Login button")}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

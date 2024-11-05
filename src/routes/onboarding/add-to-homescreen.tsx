import React from "react";
import { useForm } from "react-hook-form";
import smRectangle from "../../images/Smallrectangle.svg";
import shareBar from "../../images/Sharebar.svg";
import lgRectangle from "../../images/Largerectangle.svg";
import icons from "../../images/Addtohomescreenicons.svg";

export const AddToHomescreen: React.FC = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F5F5F5] to-[#9ECCFA] overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <h2 className="font-text text-section-header font-medium mt-5 leading-[52.8px] text-center max-w-[358px] mx-auto mb-8">
        Add the app to your home screen to get push notifications
      </h2>
      <div className="flex items-center flex-col">
        <div className="relative">
          <img src={shareBar} alt="Share Button" />
          <img src={smRectangle} alt="Click Share" className="absolute top-[1px] left-[163px]"/>
        </div>
        <div className="relative">
          <img src={icons} alt="Add to home screen tray" />
          <img src={lgRectangle} alt="Add to home screen button" className="absolute bottom-[24px] left-[20px]"/>
        </div>
      </div>
    </div>
  );
};

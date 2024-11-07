import React from "react";
import shareBar from "../../images/Sharebar.svg";
import icons from "../../images/Addtohomescreenicons.svg";

export const AddToHomescreen: React.FC = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#F5F5F5] to-[#9ECCFA] overflow-auto max-w-screen-md pb-8 relative m-auto h-screen px-4">
      <h2 className="font-text text-section-header font-medium mt-5 leading-[38.4px] text-center max-w-[358px] mx-auto mb-8">
        Add the app to your home screen to get push notifications
      </h2>
      <div className="flex items-center flex-col">
        <div className="relative">
          <img src={shareBar} alt="Share Button" />
          <img src={icons} alt="Add to home screen tray" />
        </div>
      </div>
    </div>
  );
};

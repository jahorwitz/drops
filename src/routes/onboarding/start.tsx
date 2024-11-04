import React from "react";

// TODO: Make this use the user's session to get their name and insert here
export const Start: React.FC = () => {
  return (
    <div className="flex flex-col max-w-screen-md bg-lightBlue relative overflow-hidden m-auto pb-80 h-screen">
      <div className="z-10 ">
        <div className="flex flex-col gap-6 items-center pt-32">
          <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[362px] mx-auto">
            Welcome, Rachel!<br />
            Let's set up the app to<br />
            help you feel your best.
          </h2>
          <div className="w-[346px] flex flex-col items-center  ">
            <p className="font-text text-section-subtext font-normal leading-[24px] text-center">
              Next, you'll set up goals for:<br />
              glucose levels, madication,<br />
              activity levels and diet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


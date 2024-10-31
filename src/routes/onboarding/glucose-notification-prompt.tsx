import React from "react";

export const GlucoseNotificationPrompt: React.FC = () => {
  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pb-80 h-screen">
      <div className="z-10">
        <div className="flex flex-col gap-6 items-center pt-32">
          <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto">
            Get notified to measure glucose!
          </h2>

          <div className="w-[358px] flex flex-col items-center gap-5 font-text text-section-subtext font-normal leading-[24px] text-center">
            <p>
              We will send notifications to your email with reminders to measure
              your glucose levels.
            </p>
            <p>
              Also, you can add this web app to your home screen and allow push
              notifications!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

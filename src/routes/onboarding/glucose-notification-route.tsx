import React from "react";

const textStyles = {
    base: "font-text text-section-subtext font-normal leading-[24px] text-center",
   confirmationTitle:
      "font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto",
  };

  const GlucoseNotification: React.FC = () => {
    return (
      <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pb-80 h-screen">
        <div className="z-10">
          <div className="flex flex-col gap-6 items-center pt-32">
            <h2 className={textStyles.confirmationTitle}>
              Get notified to measure glucose!
            </h2>

            <div className="w-[358px] flex flex-col items-center gap-5">
              <p className={textStyles.base}>
                We will send notifications to your email with reminders to measure your glucose levels.
              </p>
              <p className={textStyles.base}>
                Also, you can add this web app to your home screen and allow push notifications!
              </p>

            </div>
          </div>
        </div>
      </div>
    );
  };

  export default GlucoseNotification;
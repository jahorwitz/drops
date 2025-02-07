import React from "react";
import { Form } from "../../components";

export const GlucoseLevels: React.FC = () => {
  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pt-[15.5px] pr-[10px] pl-[10px] pb-[32px] h-screen">
      <div className="z-10">
        <div className="flex flex-col gap-6 items-center">
          <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto">
            Get notified to measure glucose!
          </h2>

          <div className=" flex flex-col items-center gap-5 font-text text-section-subtext font-normal leading-[16px] text-center text-black/60 text-[16px]">
            <p>
              We’ve selected these ranges based on general healthcare
              recommendations
            </p>

            <Form.GlucoseSugarRange
              title={"Fasting blood sugar range"}
              minValue={70}
              maxValue={100}
            />
            <Form.GlucoseSugarRange
              title={"Postprandial (after meals) blood sugar range"}
              minValue={100}
              maxValue={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

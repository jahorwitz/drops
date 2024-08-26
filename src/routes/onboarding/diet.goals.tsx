import React from "react";


const DietGoals: React.FC = () => {

return(
<div className="flex flex-col background: bg-pink pb-10">
        <h1 className="font-text font-[500] text-[32px] leading-[2.4rem] text-center w-[358px] h-[38px]  text-[#121212] mx-auto">
            Set your diet goals
        </h1>
    <form>
        <fieldset className="w-[370px] flex flex-col background: bg-[#22c55e] mx-2.5 rounded-2xl px-[12px] py-[16px] h-[836px]">
            <label>
            Meals per day
            </label>
            <div className="relative">
            <input type="text" inputMode="numeric" className="border-[1px] rounded-lg w-full h-[68px] px-[12px] mb-[8px]"/>
            <p className="w-[346px] h-[19px] font-text font-[400] text-[16px] leading-[19.2px] mb-[20px]">3 is a recommended amount</p>
            <button className="absolute right-[14px] top-[14px] bottom-[65px] px-4 py-2 w-[32px]] bg-green-500 text-black rounded-full border-[#243c5a] border-2"/>
            </div>
            <label>
            Snacks per day
            </label>
<div className="relative mb-[8px]">
  <input type="text" className="w-full h-[68px] px-[12px] border rounded"></input>
  <button className="absolute right-[14px] top-[14px] bottom-[18px] w-[32px] px-4 py-2 bg-green-500 text-black rounded-full border-[#243c5a] border-2"/>
</div>
<p className="font-text font-[400] w-[346px] h-[19px] text-[16px] leading-[19.2px] mb-[20px]">2 is a recommended amount</p>
<label></label>


            </fieldset>
        </form>
</div>
);




};

export default DietGoals;
import React from "react";
// import { useEffect, useState } from "react";
// import { useQuery } from "@apollo/client";
import {Link} from "react-router-dom"
import backbutton from '../../../images/Backbutton.svg';
import settingLogo from "../../../images/Setting-logo.svg";
import {Button} from "../../../components";

// interface DietLogsData {
//     logTime: string,
//     mealType: string,
//     mealDescription: string,
// }


// useEffect (() => {})
//filter logs in date buckets (Today & Last Date)
 
export const DietLogs: React.FC = () => {
    // const [upcomingMeals, setUpcomingMeals] = useState<DietLogsData[]>([],);
    // const [pastMeals, setPastMeals] = useState<DietLogsData[]>([],);

   //add useQuery for diet logs
  return (
     <div className="flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
          <Link
            to="/dashboard"
            className="z-10 flex flex-row absolute top-[15px] left-4 gap-1 cursor-pointer"
          >
            <img src={backbutton} className="mt-1 w-2 h-3" />
            <p className="text-paragraph-lg text-black leading-5">Back</p>
          </Link>
          <h1 className="text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
            Diet
          </h1>
          <Link
        //   fix to route to diet settings instead
            to="/"
            className="z-10 flex flex-row absolute cursor-pointer"
          >
            <img src={settingLogo} className="mt-1 w-2 h-3" />
            
          </Link>
          {/* Graph */}
          <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-7 pl-2.5">
            Upcoming Meals & Snacks
          </h2>
          {/* a div to map upcoming snacks */}

         {/* When click in Button, takes to a Record a Meal form */}
          <Button type="submit" buttonText="Record a Meal" variant="primary" className="h-[60px] w-full mt-24 mb-8" />
          <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-8 pl-2.5">
            Past Meals & Snacks - Today </h2>
          {/* a div to map past meals and snacks for today */}
          <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-8 pl-2.5">
          Past Meals & Snacks - Date </h2>
          {/* a div to map past deals and snacks in the past */}

            
        
    </div>
  );
};


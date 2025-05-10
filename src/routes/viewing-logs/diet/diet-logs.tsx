import React from "react";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import backbutton from '../../../images/Backbutton.svg';
import settingLogo from "../../../images/Setting-logo.svg";
import {Button} from "../../../components";
import { DIET_LOGS } from "../../../graphql/queries/diet-log";
import { useQuery } from "@apollo/client";
import { DietLogsQuery } from "../../../__generated__/graphql";

type DietLog = NonNullable<NonNullable<DietLogsQuery["dietLogs"]>[number]>;

const now = new Date();
const oneDay = 24*60*60*1000;

const dayBefore = new Date(now.getTime() - oneDay).toISOString();
// const dayAfter = new Date(now.getTime() + oneDay).toISOString();

const formatLocalTime = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}


 
export const DietLogs: React.FC = () => {
    // const [upcomingDietLogs, setUpcomingDietLogs] = useState<DietLog[]>([],);
    const [pastTodayDietLogs, setPastTodayDietLogs] = useState<DietLog[]>([],);
    const [pastBeforeTodayDietLogs, setPastBeforeTodayDietLogs ] = useState<DietLog[]>([],);


  //  const{data: upcomingDietData,
  //       loading: upcomingDietLoading,
  //       error: upcomingDietError,
  //  } = useQuery<DietLogsQuery>(DIET_LOGS, {
  //   variables: {
  //     "where": {
  //       "logTime": {
  //         "lte": dayAfter,
  //         "gte": now.toISOString(),
  //       }
  //     },
  //     "orderBy": [
  //       {
  //         "logTime": "asc"
  //       }
  //     ]
  //   },
  // });
   const{data: pastTodayDietData,
    loading: pastTodayDietLoading,
        error: pastTodayDietError,
   } =useQuery<DietLogsQuery>(DIET_LOGS, {
    variables: {
      "where": {
        "logTime": {
          "lte": now.toISOString(),
          "gte": dayBefore,
        }
      },
      "orderBy": [
        {
          "logTime": "desc"
        }
      ]
    },
  });
   const{data: pastBeforeTodayDietData,
    loading: pastBeforeTodayDietLoading,
        error: pastBeforeTodayDietError,
   } = useQuery<DietLogsQuery>(DIET_LOGS, {
    variables: {
      "where": {
        "logTime": {
          "lte": dayBefore,
          
        }
        
      },
      "orderBy": [
        {
          "logTime": "desc"
        }
      ]
    },
  })
  

  useEffect(() => {
    // if (upcomingDietData?.dietLogs) {
    //   setUpcomingDietLogs(upcomingDietData.dietLogs);
    // }

    if(pastTodayDietData?.dietLogs){

      setPastTodayDietLogs(pastTodayDietData.dietLogs);
    }
    if(pastBeforeTodayDietData?.dietLogs){
      setPastBeforeTodayDietLogs(pastBeforeTodayDietData.dietLogs)
    }
    //add upcomingDietData
  },[pastTodayDietData,pastBeforeTodayDietData]);

//add upcomingDietLoading ||
  if ( pastTodayDietLoading || pastBeforeTodayDietLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  //add upcomingDietError || 
  if (pastTodayDietError || pastBeforeTodayDietError) {
    return (
      <p className="text-center mt-10">
        An error occurred while fetching diet logs.
      </p>
    );
  }
  

  
  return (
     <div className="flex flex-col bg-lightGreen overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
        <div className="relative flex items-center py-[13px]">
          <Link
            to="/dashboard"
            className="flex flex-row absolute top-[15px] left-4 -translate-y-1/2 gap-1 items-center cursor-pointer"
          >
            <img src={backbutton} className="mt-1 w-2 h-3" />
            <p className="text-paragraph-lg text-black leading-5">Back</p>
          </Link>
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
            Diet
          </h1>
          <Link
        //   fix to route to diet settings instead
            to="/diet/settings"
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <img src={settingLogo} className="mt-1 w-[18px] h-[20px]" />
            
          </Link>
        </div>
          {/* Graph */}
          <h2 className="text-paragraph-sm text-black leading-5 opacity-60 pt-7 pl-2.5">
            UPCOMING MEALS & SNACKS
          </h2>
          {/* a div to map upcoming snacks 
            returns remainder of the meals and snack that hasnt been logged for the day
          */}

         {/* When click in Button, takes to a Record a Meal form */}
          <Button type="submit" buttonText="Record a Meal" variant="primary" className="h-[60px] w-full" />
          <h2 className="text-paragraph-sm text-black leading-5 opacity-60 pt-8 pl-2.5">
            PAST MEALS & SNACKS - TODAY </h2>
         
              {/* a div to map past meals and snacks for today */}
          <div className="flex flex-col gap-2 px-2.5 pt-3">
          {/* if pastTodayDietLogs is > 0, map the past meals today logs */}
              {pastTodayDietLogs.length > 0 ? (
              pastBeforeTodayDietLogs.map((dietlog) => (
              <div className="flex flex-col gap-1 flex-grow bg-white rounded-[16px] p-[12px_16px]">
                <div className="flex justify-between items-start">
                  <h3 className="text-paragraph-sm leading-[120%] text-black font-text break-words ">{dietlog.mealName} — {dietlog.mealDescription} </h3>
                  <p className="text-paragraph-sm leading-[-120] text-black opacity-60  font-text">{formatLocalTime(dietlog.logTime).toLowerCase()}</p>
                </div>
                <p className="text-paragraph-sm leading-[-120] text-black opacity-60  font-text">{dietlog.calories} kCal, {dietlog.protein}g protein, {dietlog?.carbs} carbs, {dietlog?.fiber}g fiber, {dietlog?.sugar}g sugar</p>
              </div>
              )
              )) : 
              
              // else, shows p tags that says "you forgot to log your meals and snack today"
              
              (
              <p className="text-sm text-gray-500">You forgot to log your meals and snack today</p>
              ) }
          </div>
          <h2 className="text-paragraph-sm text-black leading-5 opacity-60 pt-8 pl-2.5">
          PAST MEALS & SNACKS - DATE </h2>
              {/* a div to map past meals and snacks for before today */}
          <div className="flex flex-col gap-2 px-2.5 pt-3">
          {/* if pastTodayDietLogs is > 0, map the past meals before today logs */}
              {pastBeforeTodayDietLogs.length > 0 ? (
              pastBeforeTodayDietLogs.map((dietlog) => (
              <div className="flex flex-col gap-1 flex-grow bg-white rounded-[16px] p-[12px_16px]">
                <div className="flex justify-between items-start">
                  <h3 className="text-paragraph-sm leading-[120%] text-black font-text break-words ">{dietlog.mealName} — {dietlog.mealDescription}</h3>
                  <p className="text-paragraph-sm leading-[-120] text-black opacity-60  font-text">{formatLocalTime(dietlog.logTime).toLowerCase()}</p>
                </div>
                <p className="text-paragraph-sm leading-[-120] text-black opacity-60  font-text">{dietlog.calories} kCal, {dietlog.protein}g protein, {dietlog?.carbs} carbs, {dietlog?.fiber}g fiber, {dietlog?.sugar}g sugar</p>
              </div>
              )
              )) : 
              // else, shows p tags that says "you forgot to log your meals and snacks"
              (
              <p className="text-sm text-gray-500">You forgot to log your meals and snacks</p>
              ) }
          </div>

            
        
    </div>
  );
};


import React from "react";
// import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import backbutton from '../../../images/Backbutton.svg';
import settingLogo from "../../../images/Setting-logo.svg";
import {Button} from "../../../components";
// import { DIET_LOGS } from "../../../graphql/queries/diet-log";
// import { useQuery } from "@apollo/client";
// import { DietLogsQuery } from "../../../__generated__/graphql";

// type DietLog = NonNullable<NonNullable<DietLogsQuery["dietLogs"]>[number]>;

// const now = new Date();
// const oneDay = 24*60*60*1000;

// const dayBefore = new Date(now.getTime() - oneDay).toISOString();
// const dayAfter = new Date(now.getTime() + oneDay).toISOString();

 
export const DietLogs: React.FC = () => {
    // const [upcomingDietLogs, setUpcomingDietLogs] = useState<DietLog[]>([],);
    // const [pastTodayDietLogs, setPastTodayDietLogs] = useState<DietLog[]>([],);
    // const [pastBeforeTodayDietLogs, setPastBeforeTodayDietLogs ] = useState<DietLog[]>([],);


  //  const{data: upcomingDietData,
  //       // loading: upcomingDietLoading,
  //       // error: upcomingDietError,
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
  //  const{data: pastTodayDietData,
  //   // loading: pastTodayDietLoading,
  //   //     error: pastTodayDietError,
  //  } =useQuery<DietLogsQuery>(DIET_LOGS, {
  //   variables: {
  //     "where": {
  //       "logTime": {
  //         "lte": now.toISOString(),
  //         "gte": dayBefore,
  //       }
  //     },
  //     "orderBy": [
  //       {
  //         "logTime": "desc"
  //       }
  //     ]
  //   },
  // });
  //  const{data: pastBeforeTodayDietData,
  //   // loading: pastBeforeTodayDietLoading,
  //   //     error: pastBeforeTodayDietError,
  //  } = useQuery<DietLogsQuery>(DIET_LOGS, {
  //   variables: {
  //     "where": {
  //       "logTime": {
  //         "lte": dayBefore,
          
  //       }
        
  //     },
  //     "orderBy": [
  //       {
  //         "logTime": "desc"
  //       }
  //     ]
  //   },
  // })
  

  // useEffect(() => {
  //   if (upcomingDietData?.dietLogs) {
  //     setUpcomingDietLogs(upcomingDietData.dietLogs);
  //   }

  //   if(pastTodayDietData?.dietLogs){

  //     setPastTodayDietLogs(pastTodayDietData.dietLogs);
  //   }
  //   if(pastBeforeTodayDietData?.dietLogs){
  //     setPastBeforeTodayDietLogs(pastBeforeTodayDietData.dietLogs)
  //   }
  // },[upcomingDietData,pastTodayDietData,pastBeforeTodayDietData]);


  // if (upcomingDietLoading || pastTodayDietLoading || pastBeforeTodayDietLoading) {
  //   return <p className="text-center mt-10">Loading...</p>;
  // }

  // if (upcomingDietError || pastTodayDietError || pastBeforeTodayDietError) {
  //   return (
  //     <p className="text-center mt-10">
  //       An error occurred while fetching diet logs.
  //     </p>
  //   );
  // }
  

  
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
          {/* a div to map upcoming snacks 
            returns remainder of the meals and snack that hasnt been logged for the day
          */}

         {/* When click in Button, takes to a Record a Meal form */}
          <Button type="submit" buttonText="Record a Meal" variant="primary" className="h-[60px] w-full mt-24 mb-8" />
          <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-8 pl-2.5">
            Past Meals & Snacks - Today </h2>
          {/* a div to map past meals and snacks for today
              if pastTodayDietLogs is > 0, map the past meals today logs
              else, shows p tags that says "you forgot to log your meals and snack today :("
          */}
          <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-8 pl-2.5">
          Past Meals & Snacks - Date </h2>
          {/* a div to map past deals and snacks in the past 
            if pastBeforeTodayDietLogs is > 0, map the past meals before today logs
              else, shows p tags that says:"you forgot to log your meals and snacks :("
          */}

            
        
    </div>
  );
};


import React from "react";



const textStyles = {
    base: "font-text text-section-subtext font-normal leading-[24px] text-center",
   confirmationTitle:
      "font-text text-section-header font-medium leading-[38.4px] text-center max-w-[362px] mx-auto",
  };


  const StartScreen: React.FC = () => {
    return (
      
      <div className="flex flex-col max-w-screen-md relative overflow-hidden m-auto pb-80 h-screen">
        
        <div className="z-10 ">
          
          
          <div className="flex flex-col gap-6 items-center pt-32">
            <h2 className={textStyles.confirmationTitle}>
              Welcome, Rachel!<br /> 
              Let's set up the app to<br /> 
              help you feel your best.
               <link rel="stylesheet" href="" />
            </h2>
  
            <div className="w-[346px] flex flex-col items-center  ">
              <p className={textStyles.base}>
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
  
  export default StartScreen;
  
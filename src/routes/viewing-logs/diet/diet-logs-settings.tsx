import React from 'react'
import { Link} from 'react-router-dom';
import backbutton from "../../../images/Backbutton.svg";
import { DietGoalsForm } from '../../onboarding';
import { TimePicker } from '../../../components/form/time-picker';
import { AddMoreSection } from '../../../components/form/add-more-section';
import {Button} from "../../../components/button/button"

export const DietLogSettings: React.FC= () => {
    // const toggleForm = () => {
    //     console.log('Submitted!!')
    // }
  return (
    <div className="flex flex-col bg-lightGreen overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
            <div className="relative flex items-center  justify-center py-[13px]">
             
              <Link
                to="/diet"
                className="absolute left-4 flex flex-row gap-1 items-center cursor-pointer"
              >
                <img src={backbutton} className="mt-1 w-2 h-3" />
                <p className="text-paragraph-lg text-black leading-5">Back</p>
              </Link>
              <h1 className="text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
                Diet Settings
              </h1>
              </div>

              <div className='px-4 space-y-6'>
                <div>
                <h2 className='font-semibold text-lg mb-2'> Diet Goals</h2>
                <DietGoalsForm/>
                </div>
                <div className='space-y-4'>
                    <h2 className='font-semibold text-lg mb-2'> Set your diet goals reminders</h2>
                  <TimePicker setValue={()=>{}}/>
                  <AddMoreSection buttonText='+ Add another reminder'/>
                </div>
                <div className='px-4'>
                <Button buttonText='Save Settings'/>
                </div>
            
              </div>

            </div>
  )
}


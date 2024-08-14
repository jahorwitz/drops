import { TimePicker } from "../../components/form/time-picker";

const textStyles = {
  base: "font-text text-section-subtext font-normal leading-[24px] text-center",
  confirmationTitle:
    "font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto",
};

function GlucoseNotificationList() {
  const onChange = () => {
    console.log("Hello onChange");
  };

  const onClick = () => {
    console.log("Hello onClick");
  };

  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pb-80 h-screen">
      <div className="flex flex-col gap-6 items-center pt-32">
        <h1 className={textStyles.confirmationTitle}>
          Get notified to measure glucose!
        </h1>
        <div onChange={onChange}>
          <TimePicker
            name={"Set Glucose Notification"}
            setValue={onClick}
            //onChange={onChange}
            labelText={"Reminder 1"}
            //ref={useRef<HTMLInputElement>(null)}
          ></TimePicker>
        </div>
      </div>
    </div>
    // <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pb-80 h-screen">
    //   <div className="z-10">
    //     <div className="flex flex-col gap-6 items-center pt-32">
    //       <h2 className={textStyles.confirmationTitle}>
    //         Get notified to measure glucose!
    //       </h2>
    //       <div>
    //         <h1>title here</h1>
    //         <input></input>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default GlucoseNotificationList;

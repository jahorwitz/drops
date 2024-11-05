import { List } from "../../components/form/list";
import { TimePicker } from "../../components/form/time-picker";

export const GlucoseNotificationList: React.FC = () => {
  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pb-80 h-screen">
      <div className="z-10">
        <div className="flex flex-col gap-6 items-center pt-32">
          <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto">
            Get notified to measure glucose!
          </h2>
          <List
            component={TimePicker}
            componentProps={{
              validation: {
                required: "Time value is required",
                pattern: {
                  value: /^[0-9]{2}:[0-9]{2}:[AaPp][Mm]$/i,
                  message: "Invalid time format. Please use hh:mm:AM/PM",
                },
              },
            }}
          ></List>
        </div>
      </div>
    </div>
  );
};

import { Form } from "../../components";

interface Props {
  index?: number;
  onDelete?: (index: number) => void;
  elementId?: number;
}

export const GlucoseNotificationList: React.FC<Props> = ({ index }) => {
  return (
    <div className="flex flex-col max-w-screen-md bg-lightPink relative overflow-hidden m-auto pb-80 h-screen">
      <div className="flex flex-col self-center gap-6 items-center pt-32 px-4 max-w-[500px]">
        <h2 className="font-text text-section-header font-medium leading-[38.4px] text-center max-w-[358px] mx-auto">
          Get notified to measure glucose!
        </h2>
        <div className="w-full gap-5 bg-white p-4 rounded-lg flex flex-col">
          <Form.AddMoreSection buttonText="+ Add more" className="p-[0]">
            <Form.ListTimeInput label="Reminder" parentIndex={index} />
          </Form.AddMoreSection>
        </div>
      </div>
    </div>
  );
};

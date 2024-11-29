import { Link } from "react-router-dom";
import backbutton from "../../images/Backbutton.svg";

export const Notifications: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <Link
        to="/"
        className="z-10 ml-5 flex flex-row absolute top-[15px] left-4 gap-1 cursor-pointer"
      >
        <img src={backbutton} className="mt-1 w-2 h-3" />
        <p className="text-paragraph-lg text-black leading-5">Back</p>
      </Link>
      <h2 className="text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
        Notifications
      </h2>
    </div>
  );
};

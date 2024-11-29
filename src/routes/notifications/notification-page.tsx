import { Link } from "react-router-dom";
import backbutton from "../../images/Backbutton.svg";

export const Notifications: React.FC = () => {
  return (
    <div className="cursor-pointer flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <Link
        to="/"
        className="z-10 ml-5 flex flex-row absolute top-[15px] left-4"
      >
        <img src={backbutton} className="w-1 h-2" />
        <p className="text-paragraph-lg text-black leading-5">Back</p>
      </Link>
      <h2 className="text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
        Notifications
      </h2>
    </div>
  );
};

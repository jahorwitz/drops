import { Link } from "react-router-dom";
import backbutton from "../../images/Backbutton.svg";

export const Notifications: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <Link
        to="/"
        className="z-10 flex flex-row absolute top-[15px] left-4 gap-1 cursor-pointer"
      >
        <img src={backbutton} className="mt-1 w-2 h-3" />
        <p className="text-paragraph-lg text-black leading-5">Back</p>
      </Link>
      <h1 className="text-section-subtext leading-6 text-black text-center mt-[15px] font-medium">
        Notifications
      </h1>
      <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-7 pl-2.5">
        Today
      </h2>
      <h2 className="text-paragraph-lg text-black leading-5 opacity-60 pt-8 pl-2.5">
        Past
      </h2>
    </div>
  );
};

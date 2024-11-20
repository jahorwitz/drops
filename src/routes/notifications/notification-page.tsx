import { Link } from "react-router-dom";
import backbutton from "../../images/Backbutton.svg";

export const Notifications: React.FC = () => {
  return (
    <div className="cursor-pointer flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <Link to="/" className="z-10 mt-12 ml-5 flex flex-row">
        <img src={backbutton} className="w-1 h-2" />
        <p className="text-paragraph-lg text-black leading-5">Back</p>
      </Link>
    </div>
  );
};

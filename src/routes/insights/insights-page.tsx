import { Link } from "react-router-dom";
import backbutton from "../../images/Backbutton.svg";

export const Insights: React.FC = () => {
  return (
    <div className="flex flex-col bg-lightGray overflow-auto max-w-screen-md pb-8 relative m-auto h-screen">
      <Link
        to="/"
        className="z-10 flex flex-row absolute top-[15px] left-4 gap-1 cursor-pointer"
      >
        <img src={backbutton} className="mt-1 w-2 h-3" />
        <p className="text-paragraph-lg text-black leading-5">Back</p>
      </Link>
      <h1 className="text-section-header leading-[38px] text-black mt-[54px] font-medium mx-4">
        Useful insights <br /> based on your data
      </h1>
      <div className="flex flex-col gap-2 px-2.5 pt-3">
      </div>
    </div>
  );
};

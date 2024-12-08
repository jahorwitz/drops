import { ReactNode } from "react";
import editIcon from "../../images/Edit-Icon.png"
import { Link } from "react-router-dom";

type Props = {
  title: string;
  children?: ReactNode;
  link: string;
};

export const SectionWithEdit = ({title, children, link}: Props) => {
  return (
    <div className="bg-white w-[370px] rounded-2xl">
      <div className="m-3 mb-5">
        <div className="flex justify-between">
          <h2 className="text-section-subtext font-text mb-4">{title}</h2>
          <Link to={link}>
          <img className="hover:opacity-60" src={editIcon} />
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
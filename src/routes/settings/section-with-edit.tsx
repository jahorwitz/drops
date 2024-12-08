import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  children?: ReactNode;
  link: string;
  icon: string;
};

export const SectionWithEdit = ({title, children, link, icon}: Props) => {
  return (
    <div className="bg-white w-[370px] rounded-2xl p-3 pb-2">
      <div className="flex justify-between">
        <h2 className="text-section-subtext font-text mb-4">{title}</h2>
        <Link to={link}>
        <img className="hover:opacity-60" src={icon} />
        </Link>
      </div>
      {children}
    </div>
  )
}
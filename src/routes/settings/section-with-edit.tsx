import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  toggleForm: () => void;
  icon: string;
};

export const SectionWithEdit = ({
  title,
  children,
  toggleForm,
  icon,
}: Props) => {
  return (
    <div className="bg-white w-[370px] rounded-2xl p-3 pb-2">
      <div className="flex justify-between">
        <h2 className="text-section-subtext font-text mb-4">{title}</h2>
        <img className="hover:opacity-60 h-8" src={icon} onClick={toggleForm} />
      </div>
      {children}
    </div>
  );
};

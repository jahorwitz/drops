import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  // onSubmit?: FormEventHandler;
};

export const SectionWithEdit = ({title, children}: Props) => {
  return (
    <div className="bg-white w-[370px] rounded-2xl">
      <div className="mx-3">
        <h2 className="text-section-subtext font-text">{title}</h2>
        {children}
      </div>
    </div>
  )
}
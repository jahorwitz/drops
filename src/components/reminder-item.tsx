import CheckBoxChecked from "../images/CheckBox-Checked.svg";
import CheckBoxUnchecked from "../images/CheckBox-Unchecked.svg";

interface ReminderProps {
  id: string;
  time: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
  completed: boolean;
}

export default function ReminderItem({
  id,
  time,
  text,
  onClick = () => {},
  className,
  completed,
}: ReminderProps) {
  return (
    <div className={className}>
      <div className="rounded-2xl p-[10px] border border-black flex items-center gap-1 flex-grow">
        <span className="border-r border-black pr-[7px] leading-[14px] text-black opacity-60 font-text">
          {time}
        </span>
        <span className=" text-paragraph-lg leading-5 text-black-500 break-words font-text">
          {text}
        </span>
        <img
          className="ml-auto"
          src={completed ? CheckBoxChecked : CheckBoxUnchecked}
          alt=""
          onClick={() => onClick(id)}
        />
      </div>
    </div>
  );
}

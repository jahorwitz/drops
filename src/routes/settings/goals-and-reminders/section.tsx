import React from "react";
import editIcon from "../../../images/Edit-Icon.png";
import deleteIcon from "../../../images/Delete-Icon.png";
import closeIcon from "../../../images/Close-Icon.png";

interface SectionProps {
  title: string;
  data: {
    description: string | JSX.Element;
    measurement: JSX.Element | string;
  }[];
  onEdit?: (index?: number) => void;
  onDelete?: (index: number) => void;
  onAdd?: () => void;
  showDeleteButtons?: boolean;
  showAddButton?: boolean;
  singleEditButton?: boolean;
  addButtonText?: React.ReactNode;
  isEditing?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  data,
  onEdit,
  onDelete,
  onAdd,
  showDeleteButtons = true,
  showAddButton = true,
  singleEditButton = false,
  addButtonText = "+ Add measurement",
  isEditing,
}) => {
  return (
    <section className="flex flex-col gap-1 bg-white mx-auto max-w-[370px] px-3 py-3 w-full rounded-[12px] mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>

        {singleEditButton && onEdit && (
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit()}
          >
            {isEditing ? (
              <img src={closeIcon} alt="Edit" className="w-[32px] h-[32px]" />
            ) : (
              <img src={editIcon} alt="Edit" className="w-[32px] h-[32px]" />
            )}
          </button>
        )}
      </div>

      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={index} className="p-1 rounded-md">
            <div className="text-sm text-gray-600">{item.description}</div>

            <div className="items-center justify-between">
              <span className="text-black">{item.measurement}</span>
              {!singleEditButton && showDeleteButtons && onDelete && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit && onEdit(index)}
                  >
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="w-[32px] h-[32px]"
                    />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(index)}
                  >
                    <img
                      src={deleteIcon}
                      alt="Edit"
                      className="w-[32px] h-[32px]"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddButton &&
        onAdd &&
        (typeof addButtonText === "string" ? (
          <button
            type="button"
            className="font-semibold text-blue-500 hover:underline mt-3"
            onClick={onAdd}
          >
            {addButtonText}
          </button>
        ) : (
          <div className="mt-3">{addButtonText}</div>
        ))}
    </section>
  );
};

export default Section;

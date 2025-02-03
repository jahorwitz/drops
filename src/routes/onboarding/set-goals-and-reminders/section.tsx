import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
    <section className="flex flex-col gap-1 bg-white mx-auto min-w-[315px] max-w-[400px] px-4 py-3 w-full rounded-[12px] mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        {singleEditButton && onEdit && (
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => onEdit()}
          >
            <FontAwesomeIcon
              icon={isEditing ? (faTimes as IconProp) : (faEdit as IconProp)}
            />
          </button>
        )}
      </div>

      <div className="space-y-1">
        {data.map((item, index) => (
          <div key={index} className="p-3 rounded-md">
            <div className="text-sm text-gray-600 mb-1">{item.description}</div>

            <div className="items-center justify-between">
              <span>{item.measurement}</span>
              {!singleEditButton && showDeleteButtons && onDelete && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit && onEdit(index)}
                  >
                    <FontAwesomeIcon icon={faEdit as IconProp} />
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan as IconProp} />
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
            className="text-blue-500 hover:underline mt-3"
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

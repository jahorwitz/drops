import { Button } from "../";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";

type compactTimePickerProps = {
    label: string;
    onDelete?: (index: number) => void;
    onEdit?: () => void;
    index?: number;
}

const CompactTimePicker = ({label, onDelete, onEdit, index}: compactTimePickerProps) => {
    return (
        <div className="flex justify-between align-middle">
            <div>
                <p className="text-sm leading-[16.8px] text-gray-900 opacity-60">{label}</p>
                <p className="text-base leading-[19.2px] text-grey-900 mt-1">9:00pm</p>
            </div>
            <div className="flex align-middle">
                { onEdit && <Button variant="icon" icon={ faEdit }>Edit</Button>}
                { onDelete && <Button variant="icon" icon={ faTrashCan } onClick={() => {onDelete(index)}}></Button>}
            </div>
        </div>
    )
}

export default CompactTimePicker
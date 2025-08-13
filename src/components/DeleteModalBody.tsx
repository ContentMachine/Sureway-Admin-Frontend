import { Trash2, X } from "lucide-react";
import Button from "./Button";

interface Props {
  title: string;
  caption: string;
  onClose?: () => void;
}

const DeleteModalBody: React.FC<Props> = ({ title, caption, onClose }) => {
  return (
    <div className="max-w-[400px]">
      <h4 className="font-sans font-bold text-xl text-black mb-2">{title}</h4>
      <p className="font-sans font-medium text-sm text-gray-700 mb-4">
        {caption}
      </p>
      <div className="flex items-center gap-4 mt-8 justify-end">
        <Button type="tertiary" className="px-4 py-2 text-md" onClick={onClose}>
          <X size={18} />
          <span>Cancel</span>
        </Button>

        <Button className="px-4 py-2 text-md" type="delete">
          <Trash2 size={18} />
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};

export default DeleteModalBody;

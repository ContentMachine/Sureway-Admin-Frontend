import Button from "@/components/Button";
import { useToast } from "@/context/ToastContext";
import { download } from "@/helpers/download";
import useError from "@/hooks/useError";
import { orderResponseType } from "@/utils/type";
import { Download, X } from "lucide-react";
import React, { useState } from "react";

interface Props {
  image: string;
  onClose: () => void;
  order: orderResponseType;
}

const ImagePreviewModal: React.FC<Props> = ({ image, onClose, order }) => {
  // Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  //   States
  const [loading, setLoading] = useState(false);

  // Helpers
  const downloadFile = async () => {
    setLoading(true);
    try {
      await download(image, `${order?.fullName || "Customer"}'s order image `);

      showToast("Image downloaded successfully", "success");
      setLoading(false);
    } catch (err) {
      errorFlowFunction(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-[900px] min-h-[500px] flex flex-col gap-4">
      <img
        src={image}
        width={800}
        height={400}
        alt="Image Preview"
        className="h-[400px] w-full rounded-md flex-1"
      />
      <div className="flex gap-4 items-center justify-end">
        <Button onClick={downloadFile} loading={loading}>
          <Download size={16} />
          Download
        </Button>

        <Button type="tertiary" onClick={onClose}>
          <X size={16} />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;

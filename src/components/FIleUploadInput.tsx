"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { CloudUpload, X } from "lucide-react";

type FileUploadInputTypes = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  title: string;
  id?: string;
  accept?: string;
  supportedFormats?: string[];
  multiple?: boolean;
};

const FileUploadInput = ({
  files,
  setFiles,
  title,
  id,
  accept,
  supportedFormats,
  multiple,
}: FileUploadInputTypes) => {
  // States
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Utils

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      e?.dataTransfer?.clearData();
    }

    setIsDraggingOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const selectedFiles = Array.from(e?.target?.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const filterFiles = (name: string) => {
    const filteredFiles = files?.filter((data) => {
      return data?.name !== name;
    });
    setFiles(filteredFiles);
  };

  return (
    <div>
      <p className="font-sans text-black text-main font-medium">{title}</p>
      <div
        className="flex gap-1 flex-col items-center py-6 px-4 rounded-md border-1 border-gray-600"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={
          isDraggingOver
            ? { border: "2px dashed #e63e21" }
            : { border: "1px dashed #a1a1a1" }
        }
      >
        <CloudUpload color="#4d8fbf" size={32} strokeWidth="1px" />

        <h4 className=" text-gray-600 text-[14px] font-normal mt-1">
          Drag and drop files or{" "}
          <label
            className="text-blue-200 text-base font-medium  "
            htmlFor={id || "file"}
          >
            Browse
          </label>
        </h4>

        <input
          type="file"
          id={id || "file"}
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
          className="hidden"
        />

        {supportedFormats && (
          <p className="text-black text-base font-normal my-4">
            Supported formats:{" "}
            {supportedFormats?.map((data, i) => {
              if (i >= supportedFormats?.length - 1) {
                return <span>{` ${data}`}</span>;
              } else {
                return <span>{` ${data},`}</span>;
              }
            })}
          </p>
        )}
      </div>

      {files?.length > 0 && (
        <div className="mt-4">
          <h4>Uploaded File</h4>

          {files?.map((data, i) => {
            return (
              <div
                key={i}
                className="flex items-center gap-4 justify-between p-2 border-1 border-blue-200 overflow-hidden rounded-sm"
              >
                <span className="text-[12px] font-medium font-sans block">
                  {data?.name}
                </span>
                <X
                  className="shrink-0"
                  onClick={() => filterFiles(data?.name)}
                  size={18}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;

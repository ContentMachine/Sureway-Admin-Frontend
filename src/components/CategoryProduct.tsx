import { objectGenericType } from "@/utils/type";
import { Pencil, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string;
  name: string;
  onDelete?: (id: string) => void;
  onEdit: () => void;
}

const CategoryProduct: React.FC<Props> = ({
  image,
  name,
  className,
  onDelete,
  onEdit,
}) => {
  return (
    <>
      <div
        className={`border-1 p-3 rounded-sm flex items-center gap-5 border-gray-600 group ${className}`}
      >
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="rounded-sm w-12 h-12"
        />
        <span className="text-black text-sm font-medium ">{name}</span>
        <div className="group-hover:flex hidden items-center gap-3 ml-auto ">
          <PencilLine size={18} className="cursor-pointer" onClick={onEdit} />
          <Trash2
            size={18}
            className="cursor-pointer"
            onClick={() => {
              if (onDelete) {
                onDelete("me");
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;

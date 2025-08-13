import { PencilLine } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "./Button";

interface Props {
  image: string;
  name: string;
  itemCount: number;
  onClick?: () => void;
}

const CategoryCard: React.FC<Props> = ({ image, name, itemCount, onClick }) => {
  return (
    <div
      className="basis-[calc(33%-30px)] rounded-sm relative group"
      onClick={onClick}
    >
      <div className="top-0 absolute right-0 w-full h-60 items-center justify-center rounded-t-sm bg-[#333752B2] hidden group-hover:flex transition-all duration-200 ease-in-out">
        <Button type="tertiary">
          <PencilLine size={16} />
          <span>Edit</span>
        </Button>
      </div>
      <Image
        src={image}
        alt={name}
        width={350}
        height={240}
        className="w-full h-60 border-1 object-cover rounded-t-sm"
      />
      <div className="py-5 px-7 bg-white rounded-b-sm">
        <h3 className="font-bold font-sans text-base text-blue-300">{name}</h3>
        <p className="font-normal font-sans text-[14px] text-black">
          {itemCount} items
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;

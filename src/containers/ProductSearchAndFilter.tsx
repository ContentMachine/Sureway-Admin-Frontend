import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { ProductType } from "@/utils/type";
import { PencilLine, Trash2 } from "lucide-react";

interface Props {
  products: ProductType[];
}

const ProductSearchAndFilter: React.FC<Props> = ({ products }) => {
  const oneIsSelected = products?.filter((data) => data?.isActive).length === 1;
  const selectedItems = products?.filter((data) => data?.isActive);

  return (
    <div className="flex items-center gap-3">
      <Dropdown options={["Trouser"]} label="Filter" />
      <Input placeholder="Search" label="Search" />

      <div
        className={`border-2 w-10 h-10 items-center flex justify-center rounded-sm borcer-1 border-gray-700 ml-auto transition-all duration-200 ease-in-out ${
          oneIsSelected ? "visible" : "invisible"
        }`}
      >
        <PencilLine color="#003f6b" size={20} />
      </div>

      <div
        className={`border-2 w-10 h-10 flex items-center justify-center rounded-sm borcer-1 border-gray-700 transition-all duration-200 ease-in-out
      ${selectedItems?.length ? "visible" : "invisible"}
      `}
      >
        <Trash2 color="#003f6b" size={20} />
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;

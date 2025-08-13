import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { useCategories } from "@/hooks/useCategories";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { categoryType, ProductType } from "@/utils/type";
import { PencilLine, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Props {
  products: ProductType[];
}

const ProductSearchAndFilter: React.FC<Props> = ({ products }) => {
  const oneIsSelected = products?.filter((data) => data?.isActive).length === 1;
  const selectedItems = products?.filter((data) => data?.isActive);

  // States
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  // Hooks
  const { isLoading, data } = useCategories();
  const { updateSearchParams, updateConcurrentSearchParams } =
    useUpdateSearchParams();

  // Memo
  const categories: categoryType[] = useMemo(() => data?.data, [data]);
  const activeCategory: categoryType | undefined = useMemo(
    () => categories?.find((data) => data?.name === filter),
    [filter]
  );

  useEffect(() => {
    if (search || filter) {
      const timeout = setTimeout(() => {
        updateConcurrentSearchParams({
          search: { method: "set", value: search },
          filter: { method: "set", value: activeCategory?._id },
        });
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [filter, search]);

  return (
    <div className="flex items-center gap-3">
      <div className="min-w-70">
        <Dropdown
          options={categories?.map((data) => data?.name)}
          label="Filter by Category"
          isLoading={isLoading}
          selected={filter}
          setSelected={setFilter}
        />
      </div>
      <Input
        placeholder="Search"
        label="Search"
        name="search"
        onChange={(e) => inputChangeHandler(e, setSearch, true)}
        value={search}
        type="search"
      />

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

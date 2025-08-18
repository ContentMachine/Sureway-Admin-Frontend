import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { useCategories } from "@/hooks/useCategories";
import { ROUTES } from "@/utils/routes";
import { categoryType, productResponseType, productType } from "@/utils/type";
import { Loader, PencilLine, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Props {
  products: productResponseType[];
  onDelete: () => void;
  deleteIsLoading?: boolean;
}

const ProductSearchAndFilter: React.FC<Props> = ({
  products,
  onDelete,
  deleteIsLoading,
}) => {
  const oneIsSelected = products?.filter((data) => data?.isActive).length === 1;
  const selectedItems = products?.filter((data) => data?.isActive);

  // Router
  const router = useRouter();

  // States
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  // Hooks
  const { isLoading, data } = useCategories();

  // Memo
  const categories: categoryType[] = useMemo(() => data?.data, [data]);
  const activeCategory: categoryType | undefined = useMemo(
    () => categories?.find((data) => data?.name === filter),
    [filter]
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      // Handle filter param
      if (filter && filter.toLowerCase() !== "none" && activeCategory?._id) {
        params.set("filter", activeCategory._id);
      } else {
        params.delete("filter");
      }

      // Handle search param
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [filter, search, activeCategory, router, searchParams]);

  return (
    <div className="flex items-center gap-3">
      <div className="min-w-70">
        <Dropdown
          options={
            categories ? ["None", ...categories?.map((data) => data?.name)] : []
          }
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
        className={`border-2 w-10 h-10 items-center flex justify-center rounded-sm borcer-1 border-gray-700 ml-auto transition-all duration-200 ease-in-out cursor-pointer ${
          oneIsSelected ? "visible" : "invisible"
        }`}
      >
        <PencilLine
          color="#003f6b"
          size={20}
          onClick={() => {
            if (selectedItems.length === 1) {
              router.push(`${ROUTES.PRODUCTS}/${selectedItems[0]?._id}`);
            }
          }}
        />
      </div>

      <div
        className={`border-2 w-10 h-10 flex items-center justify-center rounded-sm borcer-1 border-gray-700 transition-all duration-200 ease-in-out cursor-pointer
      ${selectedItems?.length ? "visible" : "invisible"}
      `}
        onClick={onDelete}
      >
        {deleteIsLoading ? (
          <Loader className="animate-spin" size={20} color="#003f6b" />
        ) : (
          <Trash2 color="#003f6b" size={20} />
        )}
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;

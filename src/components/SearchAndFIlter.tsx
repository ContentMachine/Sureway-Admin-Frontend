import Input from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { OrderType, ProductType } from "@/utils/type";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  products: ProductType[] & OrderType[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchAndFilter: React.FC<Props> = ({ products, search, setSearch }) => {
  // Router
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      // Handle search param
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, router, searchParams]);

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Search by user email"
        label="Search"
        value={search}
        onChange={(e) => inputChangeHandler(e, setSearch, true)}
        className="min-w-[300px]"
      />
    </div>
  );
};

export default SearchAndFilter;

"use client";

import Button from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import LoaderComponent from "@/components/Loader";
import NoData from "@/components/NoData";
import Title from "@/components/Title";
import { useCategories } from "@/hooks/useCategories";
import { ROUTES } from "@/utils/routes";
import { categoryType } from "@/utils/type";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

const Categories = () => {
  // Router
  const router = useRouter();

  // Requests
  const { isLoading, data } = useCategories();

  const categories: categoryType[] = useMemo(() => data?.data, [data]);

  return (
    <section className="flex flex-col gap-6 min-h-[calc(100vh-116px)]">
      <div className="flex items-center gap-3">
        <Title>Categories</Title>
        <Button
          className="ml-auto"
          type="tertiary"
          onClick={() => router.push(ROUTES.CREATE_CATEGORY)}
        >
          <Plus size={16} />
          <span>Add category </span>
        </Button>
      </div>

      <div className="flex gap-7.5 flex-wrap">
        {isLoading ? (
          <LoaderComponent />
        ) : categories?.length < 1 ? (
          <NoData>No categories available at this time</NoData>
        ) : (
          categories?.map((data, i) => {
            return (
              <CategoryCard
                key={i}
                name={data?.name}
                itemCount={data?.productCount}
                image={data?.images?.[0]}
                onClick={() => {
                  router.push(`/categories/${data?.slug}`);
                }}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default Categories;

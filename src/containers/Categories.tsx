"use client";

import Button from "@/components/Button";
import CategoryCard from "@/components/CategoryCard";
import Title from "@/components/Title";
import { ROUTES } from "@/utils/routes";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const categories = [
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
  {
    name: "Men Clothes",
    itemsCount: 12,
    image: "/product.svg",
  },
];

const Categories = () => {
  // Router
  const router = useRouter();

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
        {categories?.map((data, i) => {
          return (
            <CategoryCard
              key={i}
              name={data?.name}
              itemCount={data?.itemsCount}
              image={data?.image}
              onClick={() => {
                router.push(`/categories/${i}`);
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Categories;

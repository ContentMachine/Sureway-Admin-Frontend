"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { FolderOutput, Plus } from "lucide-react";
import React, { useState } from "react";
import ProductSearchAndFilter from "./ProductSearchAndFilter";
import ProductsTable from "./ProductsTable";
import { ProductType } from "@/utils/type";
import Paginator from "@/components/Paginator";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

export const tableData = [
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
  {
    name: "Men Grey Hoodie",
    category: "Hoodies",
    invetory: 96,
    color: "Black",
    price: "$49.90",
    rating: 5.0,
    votes: 32,
    image: "/product.svg",
  },
];

const Products = () => {
  // States
  const [productsState, setProductsState] = useState<ProductType[]>(
    tableData?.map((data) => ({ ...data, isActive: false }))
  );

  // Router
  const router = useRouter();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Title>Products</Title>
        <Button className="ml-auto" type="tertiary">
          <FolderOutput size={16} />
          <span>Export </span>
        </Button>

        <Button
          onClick={() => {
            router.push(ROUTES.CREATE_PRODUCT);
          }}
        >
          <Plus size={16} />
          <span>Add Product</span>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg flex flex-col gap-6">
        <ProductSearchAndFilter products={productsState} />
        <ProductsTable
          products={productsState}
          setProducts={setProductsState}
        />
        <div className="mt-4 flex items-center justify-between">
          <Paginator data={productsState} maxLimit={10} />
          <p className="font-sans font-medium text-base text-gray-600">
            146 Results
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;

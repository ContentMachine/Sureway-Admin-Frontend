"use client";

import Button from "@/components/Button";
import Country from "@/components/Country";
import LoaderComponent from "@/components/Loader";
import Title from "@/components/Title";
import { getCountries } from "@/services/countryService";
import { ROUTES } from "@/utils/routes";
import { countryType } from "@/utils/type";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Countries = () => {
  // Router
  const router = useRouter();

  // Queries
  const { isLoading, data } = useQuery({
    queryFn: getCountries,
    queryKey: ["get-countries"],
  });

  const countries: countryType[] = data?.data;

  return (
    <section className="flex flex-col gap-6 min-h-[calc(100vh-116px)]">
      <div className="flex items-center gap-3">
        <Title>Countries</Title>
        <Button
          className="ml-auto"
          type="tertiary"
          onClick={() => router.push(ROUTES.CREATE_COUNTRY)}
        >
          <Plus size={16} />
          <span>Add Country </span>
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {isLoading ? (
          <LoaderComponent />
        ) : (
          countries?.map((d) => {
            return <Country key={d?.flag} data={d} />;
          })
        )}
      </div>
    </section>
  );
};

export default Countries;

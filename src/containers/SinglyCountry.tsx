"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import { useToast } from "@/context/ToastContext";
import useError from "@/hooks/useError";
import { deleteCountry } from "@/services/countryService";
import { ROUTES } from "@/utils/routes";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import CreateOrEditCountryForm from "./CreateOrEditCountryForm";

const SinglyCountry = () => {
  // Router
  const router = useRouter();
  const { countryId } = useParams();

  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  // Mutation
  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    mutationKey: ["delete-country", countryId],
    onSuccess(res) {
      showToast(res?.data?.message, "success");
      router.push(ROUTES.COUNTRIES);
    },
    onError(err) {
      errorFlowFunction(err);
    },
  });

  const handleDeleteCountry = () => [
    deleteCountryMutation.mutate(countryId as string),
  ];

  return (
    <section className="flex flex-col gap-7.5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ChevronLeft
            className="cursor-pointer"
            color="#909090"
            onClick={() => router.back()}
          />
          <Title>{countryId ? `Edit Country` : "Onboard a New Country"}</Title>
        </div>

        <Button
          type="null"
          className="ml-auto text-red-500"
          onClick={handleDeleteCountry}
          loading={deleteCountryMutation?.isPending}
        >
          <Trash2 />
        </Button>
      </div>

      <CreateOrEditCountryForm />
    </section>
  );
};

export default SinglyCountry;

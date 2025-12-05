"use client";

import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import LoaderComponent from "@/components/Loader";
import { useToast } from "@/context/ToastContext";
import useError from "@/hooks/useError";
import {
  createCountry,
  getCountryById,
  getCountryExchangeRate,
  getExternalCountries,
} from "@/services/countryService";
import { ROUTES } from "@/utils/routes";
import {
  countryCurrencyType,
  countryNameType,
  countryType,
} from "@/utils/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const CreateOrEditCountryForm = () => {
  // States
  const [selectedCountry, setSelectedCountry] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");

  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  //   Router
  const { countryId } = useParams();
  const router = useRouter();

  // Queries
  const { isLoading, data } = useQuery({
    queryKey: ["get-countries-external"],
    queryFn: getExternalCountries,
  });

  const getExchangeRateMutation = useMutation({
    mutationFn: getCountryExchangeRate,
    mutationKey: ["get-country-exchange-rate", selectedCountry],
    onSuccess: (res) => {
      setExchangeRate(res?.data?.rate);
    },
    onError(err: AxiosError) {
      errorFlowFunction(err);
    },
  });

  const createCountryMutation = useMutation({
    mutationFn: createCountry,
    mutationKey: ["create-country", selectedCountry],
    onSuccess: (res) => {
      showToast(res?.data?.message, "success");
      router.push(ROUTES.COUNTRIES);
    },
    onError(err: AxiosError) {
      errorFlowFunction(err);
    },
  });

  const { isLoading: countryDetailIsLoading, data: countryData } = useQuery({
    queryFn: () => getCountryById(countryId as string),
    queryKey: ["get-country-by-id", countryId],
    enabled: countryId ? true : false,
  });

  const countryList: countryType[] | undefined = data?.data;
  const mappedCountryList: string[] | undefined = countryList?.map(
    (c) => (c?.name as countryNameType)?.common
  );

  const selectedCountryObj: countryType | undefined = useMemo(() => {
    if (countryId) {
      return countryData?.data;
    } else {
      return selectedCountry
        ? countryList?.find(
            (c) =>
              (c?.name as countryNameType)?.common?.toLowerCase() ===
              selectedCountry?.toLowerCase()
          )
        : undefined;
    }
  }, [countryId, countryData, selectedCountry]);

  const selectedCountryCurrency: countryCurrencyType | null = selectedCountryObj
    ? Object?.values(selectedCountryObj?.currencies)?.[0]
    : null;

  const formData = useMemo(() => {
    if (countryId) {
      return selectedCountryObj;
    } else {
      return selectedCountryObj;
    }
  }, [countryId, selectedCountry, selectedCountryObj]);

  // Handlers
  const handleGetExchangeRate = () => {
    if (selectedCountryObj) {
      const currencyAbb = Object?.keys(selectedCountryObj?.currencies)?.[0];

      if (currencyAbb) getExchangeRateMutation?.mutate(currencyAbb);
    }
  };

  const handleCreateCountry = () => {
    if (selectedCountryObj) {
      const data: countryType = {
        ...selectedCountryObj,
        name: (selectedCountryObj?.name as countryNameType)?.common,
      };

      createCountryMutation?.mutate(data);
    }
  };

  // Effect
  useEffect(() => {
    if (selectedCountryObj) {
      handleGetExchangeRate();
    }
  }, [selectedCountryObj]);

  useEffect(() => {
    if (countryId && selectedCountryObj) {
      setSelectedCountry(selectedCountryObj?.name as string);
    }
  }, [countryId, selectedCountryObj]);

  return (
    <section className="basis-[70%] bg-white p-7 rounded-md font-sans flex flex-col gap-4">
      <h2 className="text-black-600 text-xl font-bold ">Country Name</h2>
      {countryDetailIsLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="max-w-[calc(50%-28px)]">
              <Dropdown
                title="Select a country"
                options={mappedCountryList}
                isLoading={isLoading}
                selected={selectedCountry}
                setSelected={setSelectedCountry}
              />
            </div>
          </form>

          <hr className="border-0.5 border-[#ebebeb]" />

          {(isLoading || getExchangeRateMutation?.isPending) && (
            <LoaderComponent />
          )}

          {formData && (
            <form action="" className="">
              <h2 className="mb-4 text-black-600 text-xl font-bold ">
                More Information
              </h2>
              <div className="flex flex-start gap-7 flex-wrap">
                <Input
                  label="Currency"
                  className="basis-[calc(50%-28px)]"
                  name="price"
                  value={`${selectedCountryCurrency?.name} (${selectedCountryCurrency?.symbol})`}
                  readOnly
                />
                <Input
                  label="Exchange Rate in Dollar ($)"
                  className="basis-[calc(50%-28px)]"
                  name="exchangeRate"
                  value={exchangeRate}
                  readOnly
                />
              </div>

              {!countryId && (
                <Button
                  className="mt-8 ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCreateCountry();
                  }}
                  disabled={!selectedCountryObj}
                  loading={createCountryMutation?.isPending}
                >
                  Save
                </Button>
              )}
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default CreateOrEditCountryForm;

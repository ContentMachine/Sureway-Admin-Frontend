import { countryType } from "@/utils/type";
import axios from "axios";
import axiosInstance from ".";

export const getExternalCountries = async () => {
  const response = await axiosInstance.get<countryType[]>(
    "https://restcountries.com/v3.1/all?fields=currencies,flag,flags,name,cca3,latlng"
  );
  return response;
};

export const getCountryExchangeRate = async (symbol: string) => {
  const capitalizedSymbol = symbol.toUpperCase();
  const response = await axiosInstance.get(
    `/exchange-rate/rate/${capitalizedSymbol}`
  );
  return response;
};

export const createCountry = async (country: countryType) => {
  const response = await axiosInstance.post("/country", country);
  return response;
};

export const getCountries = async () => {
  const response = await axiosInstance.get("/country");
  return response;
};

export const getCountryById = async (slug: string) => {
  const response = await axiosInstance.get(`/country/${slug}`);
  return response;
};

export const deleteCountry = async (slug: string) => {
  const response = await axiosInstance.delete(`/country/${slug}`);
  return response;
};

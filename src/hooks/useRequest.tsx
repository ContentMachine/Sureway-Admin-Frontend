"use client";

import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { requestType } from "@/utils/type";
import axiosInstance from "../services/index";
import useError from "./useError";
import { useToast } from "@/context/ToastContext";

type RequestType = {
  method: string;
  url: string;
  headers?: any;
  data?: any;
  isMultipart?: boolean;
  state?: requestType;
  setState?: Dispatch<SetStateAction<requestType>>;
  successFunction?: (res?: AxiosResponse) => void;
  errorFunction?: (err: AxiosError) => void;
  load?: boolean;
  requestCleanup?: boolean;
  id?: string;
  successMessage?: string;
  errorMessage?: boolean;
};

const useRequest = () => {
  // Hooks
  const { errorFlowFunction } = useError();
  const { showToast } = useToast();

  async function requestHandler({
    method,
    url,
    headers,
    data,
    isMultipart,
    setState,
    successFunction,
    errorFunction,
    load,
    requestCleanup,
    id,
    successMessage,
  }: RequestType) {
    if ((setState && load === true) || (setState && load === undefined)) {
      setState((prevState) => {
        return { ...prevState, isLoading: true, id: id as string };
      });
    } else if (setState && load === false) {
      setState((prevState) => {
        return { ...prevState, isLoading: false, id: id as string };
      });
    }

    axiosInstance({
      method,
      url,
      headers: {
        "Content-Type": !isMultipart
          ? "application/json"
          : "multipart/form-data",
        ...headers,
      },
      data,
    })
      .then((res) => {
        if (setState) {
          setState({
            isLoading: false,
            data: res?.data,
            error: null,
            id: id as string,
          });

          if (requestCleanup) {
            setTimeout(() => {
              setState({
                isLoading: false,
                data: null,
                error: null,
                id: id as string,
              });
            }, 5000);
          }
        }
        if (successFunction) {
          successFunction(res);
        }

        if (successMessage) {
          showToast(res?.data?.message || successMessage, "success");
        }
      })
      .catch((err) => {
        errorFlowFunction(err);

        if (setState) {
          setState({
            isLoading: false,
            data: null,
            error: err.response?.data?.message || err?.message,
            id: id as string,
          });

          if (requestCleanup) {
            setTimeout(() => {
              setState({
                isLoading: false,
                data: null,
                error: null,
                id: id as string,
              });
            }, 5000);
          }
        }
        if (errorFunction) {
          errorFunction(err);
        }
      });
  }

  return { requestHandler };
};

export default useRequest;

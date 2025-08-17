"use client";

import { requestHandler } from "@/helpers/requestHandler";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utils/constants";
import { ROUTES } from "@/utils/routes";
import { requestType, userType } from "@/utils/type";
import { useRouter } from "../../node_modules/next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AuthContextValuesType = {
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
  requestState: requestType;
  logout: () => void;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextValuesType);

const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  // States
  const [user, setUser] = useState<null | userType>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // ROuter
  const router = useRouter();

  //   Requests
  const getUser = () => {
    requestHandler({
      url: "/auth/profile",
      method: "GET",
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        setUser(res?.data);
      },
      errorFunction(err) {
        if (typeof window !== "undefined") {
          const accessToken = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

          if (!accessToken) {
            logout();
          }
        }

        setUser(null);
      },
    });
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    setUser(null);
    router.push(ROUTES.SIGN_IN);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, requestState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

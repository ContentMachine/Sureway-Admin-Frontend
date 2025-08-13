"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useContext, useState } from "react";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestType } from "@/utils/type";
import useRequest from "@/hooks/useRequest";
import { AuthContext } from "@/context/AuthContext";
import { LOCAL_STORAGE_AUTH_KEY } from "@/utils/constants";

const SignIn = () => {
  // Router
  const router = useRouter();

  // Hooks
  const { requestHandler } = useRequest();

  // COntext
  const { setUser } = useContext(AuthContext);

  // States
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [loginRequestState, setLoginRequestState] = useState<requestType>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleSignIn = () => {
    requestHandler({
      method: "POST",
      url: "/auth/login",
      data: authData,
      state: loginRequestState,
      setState: setLoginRequestState,
      successFunction(res) {
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, res?.data?.token);
        router.replace(ROUTES.DASHBOARD);
        setUser(res?.data?.user);
      },
    });
  };

  return (
    <section className="flex items-center justify-center h-screen ">
      <form className="w-[540px] px-15 py-12 box-shadow2 bg-white rounded-md">
        <h4 className="font-sans font-bold text-3xl text-center text-black mb-2">
          Welcome back!
        </h4>
        <p className="font-sans font-medium text-main text-center text-gray-300 mb-8">
          Sign in securely to check your devices and give you full remote
          control.
        </p>
        <Input
          label="Email"
          isRequired
          name="email"
          type="email"
          className="mb-4"
          onChange={(e) => {
            inputChangeHandler(e, setAuthData);
          }}
          value={authData?.email}
        />
        <Input
          label="Password"
          type="password"
          isRequired
          name="password"
          tip="Your password should be at least 8 characters"
          onChange={(e) => {
            inputChangeHandler(e, setAuthData);
          }}
          value={authData?.password}
          condition={authData?.password.length >= 6}
        />

        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="mt-8 w-full text-white"
          disabled={
            !authData?.email ||
            !authData?.password ||
            authData?.password?.length < 6
          }
          loading={loginRequestState?.isLoading}
        >
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default SignIn;

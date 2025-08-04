"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";

const SignIn = () => {
  return (
    <section className="flex items-center justify-center h-screen ">
      <form className="w-[540px] px-15 py-12 box-shadow2 bg-white rounded-md">
        <h4 className="font-sans font-bold text-3xl text-center text-black mb-2">
          Welcome back!
        </h4>
        <p className="font-sans font-medium text-main text-center text-gray-700 mb-8">
          Sign in securely to check your devices and give you full remote
          control.
        </p>
        <Input label="Email" isRequired name="email" type="email" />
        <Input
          label="Password"
          type="password"
          isRequired
          name="password"
          tip="Your password should be at least 8 characters"
        />

        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="mt-8 w-full text-white"
        >
          Sign In
        </Button>
      </form>
    </section>
  );
};

export default SignIn;

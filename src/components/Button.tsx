import { cn } from "@/lib/tailwind-utils";
import { Loader } from "lucide-react";
import React, { CSSProperties } from "react";

type ButtonPropTypes = {
  children: React.ReactNode;
  type?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "null"
    | "invalid"
    | "yellow"
    | "bordered"
    | "delete";
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  icon?: React.ReactNode;
  id?: string;
  style?: CSSProperties;
};

const Button = ({
  children,
  type,
  disabled,
  onClick,
  loading,
  className,
  icon,
  id,
  style,
}: ButtonPropTypes) => {
  return (
    <button
      className={cn(
        `flex px-8 py-3 items-center justify-center gap-2.5 font-sans text-base font-semibold text-center select-none cursor-pointer whitespace-nowrap transition-all ease-in-out duration-200 box-shadow rounded-md hover:opacity-80  ${
          type === "secondary"
            ? "bg-yellow-100 border-1 border-yellow-100 text-black active:text-white"
            : type === "tertiary"
            ? "bg-white text-blue-200 border-none"
            : type === "null"
            ? "bg-transparent text-blue-200 border-none"
            : type === "bordered"
            ? "border-blue-200 border-1.5 text-white"
            : type === "delete"
            ? "bg-red-500 text-white"
            : "bg-blue-200 border-none text-white"
        } ${className} disabled:bg-gray-600 disabled:cursor-not-allowed`
      )}
      onClick={onClick}
      disabled={disabled}
      id={id}
      style={style}
    >
      {loading ? <Loader size={16} className="animate-spin" /> : children}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default Button;

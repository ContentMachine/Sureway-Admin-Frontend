"use client";

import { Dispatch, SetStateAction } from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  checked: boolean;
  setChecked?: Dispatch<SetStateAction<boolean>>;
  onChange?: () => void;
}

const Toggle: React.FC<Props> = ({
  checked,
  setChecked,
  className,
  onChange,
}) => {
  return (
    <button
      onClick={() => {
        setChecked && setChecked((prevState) => !prevState);
        onChange && onChange();
      }}
      className={`w-11 h-6 flex items-center rounded-[16px] p-1 transition-colors duration-300 ${className} ${
        checked ? "bg-blue-200" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default Toggle;

"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Loader } from "lucide-react";

type TextAreaProps = {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  inValidCondition?: boolean;
  placeholder?: string;
  tip?: string;
  style?: React.CSSProperties;
  name?: string;
  condition?: boolean;
  readOnly?: boolean;
  state?: string;
  setState?: Dispatch<SetStateAction<string>>;
  onKeyup?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  min?: number | string | any;
  max?: number | string | any;
  loading?: boolean;
};

const TextArea = ({
  label,
  onChange,
  onBlur,
  value,
  isRequired,
  errorMessage,
  inValidCondition,
  placeholder,
  tip,
  style,
  name,
  condition,
  readOnly,
  onKeyup,
  onFocus,
  min,
  max,
  loading,
}: TextAreaProps) => {
  // States
  const [invalid, setInvalid] = useState(false);

  return (
    <div style={style}>
      {label && (
        <>
          <label
            htmlFor=""
            className="font-sans text-black text-main font-medium"
          >
            {label}
          </label>
          {"  "}
          {isRequired && (
            <span className="text-red-400 font-sans text-md font-medium">
              *
            </span>
          )}
        </>
      )}
      <span className="relative block my-1">
        <textarea
          name={name}
          placeholder={placeholder}
          id={label}
          onChange={onChange}
          readOnly={readOnly}
          onBlur={(e) => {
            if (isRequired && e.target.value === "") {
              setInvalid(true);
            } else {
              setInvalid(false);
            }

            if (condition !== undefined && condition === false) {
              setInvalid(true);
            }
            if (onBlur) onBlur();
          }}
          onFocus={() => {
            if (onFocus) {
              onFocus();
            }
          }}
          value={value}
          className={`block w-full p-3 font-sans text-base my-1 rounded-md transition-all duration-200 ease-in-out border-1 border-black bg-transparent text-black placeholder:font-medium placeholder:text-base placeholder:gray-600 outline-none focus:border-1 focus:border-yellow-100 min-h-25 resize-none"  ${
            invalid
              ? "border-1 border-red-400 text-red-400"
              : "border-1 border-gray-600"
          }`}
          onKeyUp={onKeyup}
        />
        {loading && (
          <Loader size="1rem" color="inherit" style={{ color: "#a7c7e7" }} />
        )}
      </span>
      {(invalid || inValidCondition) && (
        <span className="text-red-400 font-sans text-sm transition-all ease-in-out duration-200 block">
          {errorMessage || `Please enter a valid ${label?.toLowerCase()}`}{" "}
        </span>
      )}
      {tip && (
        <span className="text-gray-300 font-sans text-sm transition-all ease-in-out duration-200">
          {tip}
        </span>
      )}
    </div>
  );
};

export default TextArea;

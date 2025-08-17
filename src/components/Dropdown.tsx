"use client";

import React, { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

export type DropdownProps = {
  title?: string | React.ReactNode;
  options: string[] | undefined;
  selected?: string | undefined | any;
  setSelected?: React.Dispatch<React.SetStateAction<string | undefined | any>>;
  isLoading?: boolean;
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
  onOpen?: () => void;
  maxHeight?: string;
};

const Dropdown = (props: DropdownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [keyPressedValue, setKEyPressedValue] = useState("");
  const [optionsState, setOptionsState] = useState<string[] | undefined>(
    props.options
  );
  const [invalid, setInvalid] = useState(false);

  // ref
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownItem = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.options) {
      setOptionsState(props.options);
    }
  }, [props.options]);

  useEffect(() => {
    if (searchInput && isActive) {
      searchInput.current?.focus();
    }
  }, [isActive]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const removeDropdownHandler = (e: any) => {
        if (dropdownRef && !dropdownRef?.current?.contains(e.target)) {
          setIsActive(false);
        } else {
        }
      };
      document.addEventListener("mousedown", removeDropdownHandler);

      return () => {
        document.removeEventListener("mousedown", removeDropdownHandler);
      };
    }
  }, []);

  useEffect(() => {
    const removeDropdownHandler = (e: any) => {
      if (dropdownRef && !dropdownRef?.current?.contains(e.target)) {
        setIsActive(false);
      } else {
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", removeDropdownHandler);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", removeDropdownHandler);
      }
    };
  }, [props.selected, props.isRequired]);

  return (
    <div className="min-w-50">
      {props?.label && (
        <label
          htmlFor={props.label}
          className="font-sans text-black text-main font-medium"
        >
          {props.label}{" "}
          {props.isRequired && (
            <span className="text-red-400 font-sans text-md font-medium">
              *
            </span>
          )}
        </label>
      )}

      <div
        className={`relative select-none rounded-md w-full h-12.5 p-4 my-1  transition-all duration-200 ease-in-out bg-transparent text-black  ${
          invalid ? "border-1 border-red-400" : "border-1 border-gray-600"
        } ${
          isActive ? "border-1 border-yellow-100" : "border-1 border-gray-600"
        }`}
        ref={dropdownRef}
      >
        <div
          // tabIndex={0}
          className="h-full flex items-center justify-between text-black font-sans text-base cursor-pointer transition-all ease-in-out duration-200"
          onClick={() => {
            setIsActive(!isActive);
            if (props.onOpen) {
              props.onOpen();
            }
          }}
          onBlur={() => {
            if (props.isRequired && !props?.selected && !isActive) {
              setInvalid(true);
            } else {
              setInvalid(false);
            }
          }}
          tabIndex={0}
          onKeyDown={(event) => {
            setKEyPressedValue(event.key);
            const optionsCopy =
              props.options &&
              props.options.filter((data) => {
                return data?.toString().toLowerCase().charAt(0) === event.key;
              });
            setOptionsState(optionsCopy);
            if (event.key === "Backspace") {
              setOptionsState(props.options);
            }
          }}
        >
          {props?.selected ||
            props?.title ||
            `Select ${props.label?.toLowerCase() || "an option"}`}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={
              isActive
                ? { transform: "rotate(-90deg)" }
                : { transform: "rotate(0deg)" }
            }
            className="w-4 h-4 cursor-pointer transition-all ease-in-out duration-200 "
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="black"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {isActive && (
          <div
            className="absolute w-full top-[110%] left-0 box-border z-[2] bg-white min-h-full max-h-[35opx] overflow-y-auto text-left border-none transition-all ease-in-out duration-200 box-shadow2 rounded-md "
            style={{ maxHeight: props.maxHeight || undefined }}
          >
            {props.options && props.options?.length > 8 && (
              <div className="h-15 p-2 sticky top-0 bg-white z-[1]">
                <input
                  type="text"
                  placeholder="Search"
                  value={keyPressedValue}
                  onChange={(e) => {
                    setKEyPressedValue(e.target.value);
                  }}
                  ref={searchInput}
                  className="w-full h-full rounded-md text-black font-sans text-xs font-medium"
                />
              </div>
            )}
            {optionsState && optionsState.length > 0 ? (
              optionsState
                ?.filter((option) => {
                  return keyPressedValue.toLowerCase() === ""
                    ? option
                    : option
                        ?.toLowerCase()
                        ?.includes(keyPressedValue?.toLowerCase());
                })
                ?.map((option, i) => {
                  return (
                    <div
                      key={i}
                      className="py-2.5 px-5 cursor-pointer transition-all ease-in-out duration-200 relative text-black font-sans text-md font-medium w-full hover:bg-gray-100"
                      onClick={() => {
                        if (props.setSelected) props?.setSelected(option);
                        setIsActive(false);
                      }}
                      ref={dropdownItem}
                    >
                      {option}
                    </div>
                  );
                })
            ) : !props.isLoading &&
              props.options &&
              props.options.length === 0 ? (
              <p
                className={`py-2 px-4 cursor-pointer transition-all ease-in-out duration-200 text-black font-sans text-md font-medium`}
              >
                No matching Items
              </p>
            ) : (
              <div className="w-full h-full min-h-50 flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>
      {invalid && (
        <div className="text-black font-sans text-sm font-medium">
          {props.errorMessage || "Please choose an option to continue"}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

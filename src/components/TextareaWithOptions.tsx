"use client";

import {
  useEffect,
  useRef,
  useCallback,
  type TextareaHTMLAttributes,
  SetStateAction,
  Dispatch,
  useState,
} from "react";
import { cn } from "@/lib/tailwind-utils";
import { Info, Plus, X } from "lucide-react";

export type TextareaProps = TextareaHTMLAttributes<HTMLInputElement> & {
  style?: React.CSSProperties;
  onKeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  loading?: boolean;
  className?: string;
  label?: string;
  maxHeight?: number | string;
  enhanceAction?: () => void;
  containerClassName?: string;
  toolTipMessage?: string;
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  suggestions?: string[];
};

function TextareaWithOptions({
  className,
  label,
  id,
  style,
  maxHeight = 300,
  enhanceAction,
  containerClassName,
  toolTipMessage,
  options,
  setOptions,
  suggestions,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLInputElement>(null);

  //   States
  const [option, setOption] = useState("");

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(
        el.scrollHeight,
        typeof maxHeight === "number" ? maxHeight : parseInt(maxHeight)
      )}px`;
    }
  }, [maxHeight]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  return (
    <div className={`relative ${containerClassName}`}>
      <div
        className={`group w-full rounded-2xl  transition-all z-[2] relative bg-white`}
      >
        <div className="flex items-center gap-1">
          {label && (
            <label
              htmlFor={id}
              className="font-sans text-black text-main font-medium"
            >
              {label}
            </label>
          )}
          {toolTipMessage && (
            <Info color="#A4A7AE" size={10} className="cursor-pointer" />
          )}
        </div>

        <div
          className={`flex items-stretch gap-2 flex-wrap mt-2 w-full p-3 font-sans text-base rounded-md transition-all duration-200 ease-in-out bg-transparent text-black placeholder:font-medium placeholder:text-base placeholder:gray-600 outline-none focus:border-1 focus:border-yellow-100 resize-none border-1 border-gray-600`}
        >
          {options.map((data) => {
            return (
              <div className="flex items-stretch gap-0" key={data}>
                <span className="font-geist font-medium text-sm text-[#7E84A3] px-2 py-0.5 rounded-l-[2px] bg-[#E6E9F4] flex items-center justify-center">
                  {data}
                </span>
                <X
                  color="#7E84A3"
                  size={12}
                  className="h-full py-2 px-1 w-5 rounded-r-[2px] bg-[#E6E9F4] cursor-pointer"
                  onClick={() => {
                    setOptions((prevState) => {
                      return prevState.filter((filterData) => {
                        return filterData !== data;
                      });
                    });
                  }}
                />
              </div>
            );
          })}

          <input
            ref={textareaRef}
            id={id}
            data-slot="input"
            onInput={adjustHeight}
            style={{ ...style, overflow: "auto", maxHeight }}
            className={cn(
              "bg-transparent resize-none min-w-6 text-sm outline-none shadow-none pl-0 focvs-visible:ring-0 focus-visible:border-none border-none flex-1",
              !label && "h-full",
              "text-sm font-medium",
              className
            )}
            onChange={(e) => setOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!options.includes(option) && option.length > 0) {
                  setOptions((prevState) => {
                    return [...prevState, option];
                  });

                  setOption("");
                }
              }
            }}
            value={option}
            {...props}
          />
        </div>
      </div>
      {(suggestions as string[])?.length > 0 && (
        <div
          className={` transition-all ease-in-out duration-200 overflow-hidden translate-y-[-16px] ${
            option?.length > 0 ? "max-h-[400px]" : "max-h-[0px]"
          }`}
        >
          <div
            className={` flex items-stretch gap-2 flex-wrap pt-8 px-4 pb-4 rounded-b-[16px] bg-[#F9FAFB] relative z-[1] overflow-hidden`}
          >
            {suggestions
              ?.filter((data) => !options.includes(data))
              ?.map((data) => {
                return (
                  <div className="flex items-stretch gap-0" key={data}>
                    <span className="font-sans text-black text-sm px-2 py-0.5 rounded-l-[2px] bg-white flex items-center justify-center">
                      {data}
                    </span>
                    <Plus
                      color="#A4A7AE"
                      className="h-full py-2 px-1 w-5 rounded-r-[2px] bg-white cursor-pointer"
                      onClick={() => {
                        setOptions((prevState) => {
                          return [...prevState, data];
                        });
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export { TextareaWithOptions };

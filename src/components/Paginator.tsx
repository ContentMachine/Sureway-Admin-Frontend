import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginatorTypes = {
  data: any[];
  maxLimit: number;
  setPaginatedData?: Dispatch<SetStateAction<any[]>>;
  isBackend?: boolean;
  setActiveNumberState?: Dispatch<SetStateAction<number>>;
  pages?: number;
};

const Paginator = ({
  data,
  maxLimit,
  setPaginatedData,
  isBackend,
  setActiveNumberState,
  pages,
}: PaginatorTypes) => {
  // States
  const [activeNumber, setActiveNumber] = useState<number>(1);

  // Utils
  let numbers: number[] = [];
  let limit = maxLimit;

  const remainder = data?.length % limit > 0 ? 1 : 0;
  const pageNumbers = !isBackend
    ? data?.length / limit + remainder
    : (pages as number);

  for (let i: number = 1; i <= pageNumbers; i++) {
    numbers.push(i);
  }

  const increaseActiveNumber = () => {
    if (activeNumber < pageNumbers) {
      setActiveNumber((prevState) => prevState + 1);
    }
  };

  const decreaseActiveNumber = () => {
    if (activeNumber !== 1) {
      setActiveNumber((prevState) => prevState - 1);
    }
  };

  // Effects
  useEffect(() => {
    const activeEndNumber = limit * activeNumber;
    const activeStartNumber = activeEndNumber - limit;

    if (activeNumber && setPaginatedData) {
      setPaginatedData(data?.slice(activeStartNumber, activeEndNumber));
    }

    if (isBackend && setActiveNumberState) {
      setActiveNumberState(activeNumber);
    }

    // eslint-disable-next-line
  }, [activeNumber]);

  return (
    <section className="flex items-center  gap-4 select-none">
      <ChevronLeft
        size={20}
        onClick={decreaseActiveNumber}
        className="shrink-0 cursor-pointer"
      />
      <div className="flex items-center gap-4">
        {numbers.slice(activeNumber - 1, activeNumber + 4).map((data) => {
          return (
            <span
              className={`${
                activeNumber === data ? "bg-blue-200 text-white" : undefined
              } flex items-center justify-center w-7.5 h-7.5 rounded-sm font-sans text-base font-medium cursor-pointer`}
              key={data}
              onClick={() => {
                setActiveNumber(data);
              }}
            >
              {data}
            </span>
          );
        })}
        {numbers[numbers.length - 1] - activeNumber > 4 && <span>....</span>}
        {numbers[numbers.length - 1] - activeNumber > 4 && (
          <span>{numbers[numbers.length - 1]}</span>
        )}
      </div>

      <ChevronRight
        onClick={increaseActiveNumber}
        size={20}
        className="shrink-0 cursor-pointer"
      />
    </section>
  );
};

export default Paginator;

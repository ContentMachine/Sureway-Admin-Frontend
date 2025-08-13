import React from "react";

interface Props {
  children: React.ReactNode;
}

const NoData: React.FC<Props> = ({ children }) => {
  return (
    <p className="text-sm text-gray-600 font-medium font-sans text-center w-full py-4">
      {children}
    </p>
  );
};

export default NoData;

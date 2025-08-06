import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Title: React.FC<Props> = ({ children }) => {
  return (
    <div className="font-bold font-sans text-2xl text-black">{children}</div>
  );
};

export default Title;

import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  firstName: string;
  lastName?: string;
}

const User: React.FC<Props> = ({ firstName, lastName, ...props }) => {
  return (
    <div
      {...props}
      className={` w-9 h-9 bg-green-400 rounded-full font-sans font-medium text-md text-white flex items-center justify-center cursor-pointer ${props?.className}`}
    >
      {firstName?.[0].toUpperCase()}
      {lastName?.[0].toUpperCase()}
    </div>
  );
};

export default User;

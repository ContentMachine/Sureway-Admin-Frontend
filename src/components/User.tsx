import React from "react";

interface Props {
  firstName: string;
  lastName?: string;
  className?: string
}

const User: React.FC<Props> = ({ firstName, lastName, ...props }) => {
  return (
    <div {...props}>
      {firstName?.[0].toUpperCase()}
      {lastName?.[0].toUpperCase()}
    </div>
  );
};

export default User;

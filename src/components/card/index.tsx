import React from "react";

import { CardBody, CardWrapper } from "./style";

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <CardWrapper>
      <CardBody>{children}</CardBody>
    </CardWrapper>
  );
};

export default Card;

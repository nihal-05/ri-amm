import React from "react";
// import { SharedDivider } from "../../styles/styled";

import { CardBody, CardHeading, StyledCard } from "./style";

interface CardProps {
  cardTitle?: string;
  children: React.ReactNode;
  style?: {};
}

const Card = ({ children, cardTitle, style }: CardProps) => {
  return (
    <StyledCard style={style}>
      <CardHeading>{cardTitle}</CardHeading>
      {/* <SharedDivider /> */}
      <CardBody>{children}</CardBody>
    </StyledCard>
  );
};

export default Card;

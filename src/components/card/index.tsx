import React from "react";

import {
  CardBody,
  CardHeading,
  SharedDivider,
  StyledCard,
  WrappingContainer,
} from "./style";

interface CardProps {
  cardTitle?: string;
  children: React.ReactNode;
  style?: {};
}

const Card = ({ children, cardTitle, style }: CardProps) => {
  return (
    <WrappingContainer>
      <StyledCard style={style}>
        <CardHeading>{cardTitle}</CardHeading>
        <SharedDivider />
        <CardBody>{children}</CardBody>
      </StyledCard>
    </WrappingContainer>
  );
};

export default Card;

import styled from "styled-components";
import { colors } from "../../theme";

export const WrappingContainer = styled.h2`
  font-weight: bold;
  color: ${colors.brandTextColor};
  background-color: red;
`;

export const CardHeading = styled.h2`
  font-weight: bold;
  color: ${colors.brandTextColor};
  padding: 20px 40px;
`;
export const CardBody = styled.section`
  padding: 20px 40px;
`;
export const StyledCard = styled.section`
  border: 2px solid ${colors.myBorderColor};
  border-radius: 12px;
  background-color: ${colors.cardBg};
`;

export const SharedDivider = styled.p`
  border-bottom: 1px solid ${colors.myBorderColor};
  width: 100%;
  margin: 0;
`;

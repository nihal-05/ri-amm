import styled from "styled-components";
import { colors } from "../../theme";



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

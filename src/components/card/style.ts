import styled from "styled-components";
import { colors, screenSizes } from "../../theme";

export const CardWrapper = styled.div`
  color: white;
  /* width: 100%; */
  height: 85vh;
  border-radius: 12px;
  padding: 10px 16px;
  background-color: #1c3738;
  font-family: sans-serif;
  font-size: 1rem;
  justify-content: space-between;
  @media (min-width: ${screenSizes.mediaSX}px) {
    width: 400px;
    padding: 20px 50px;
  }
`;

export const CardHeading = styled.section`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: space-evenly;
`;
export const CardBody = styled.section`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  justify-content: space-around;
  min-width: 280px;
  height: 100%;
`;

export const SharedDivider = styled.p`
  border-bottom: 1px solid ${colors.myBorderColor};
  width: 100%;
  margin: 0;
`;

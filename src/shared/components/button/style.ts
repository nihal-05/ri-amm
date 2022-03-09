import styled, { css, keyframes } from "styled-components";
import { colors } from "../../../theme";

const animateLoader = keyframes`
from {transform : rotate(0deg)}
to {transform : rotate(360deg)}
`;

// here in the svg you can add the svg according and can animate
const svgCSS = css`
  font-size: 26px;
  animation: ${animateLoader} linear 2s infinite;
`;
const buttonStyles = css`
  outline: none;
  border-radius: 6px;
  padding: 10px 12px;
  color: ${colors.brandBg};
  border: 1px solid ${colors.btnBg};
  cursor: pointer;
  transition: all linear 0.3s;
  background-color: #8baaad;
  :hover,
  :focus {
    /* box-shadow: 0px 0px 5px rgb(0 0 0 / 90%); */
    filter: brightness(75%) saturate(120%);
  }
  svg {
    ${svgCSS}
  }
`;
const error = css`
  background: #dc3545;
  color: white;
  transition: all linear 0.3s;
  border: 1px solid red;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px red;
  }
`;
const success = css`
  background: #38a169;
  color: white;
  transition: all linear 0.3s;
  border: 1px solid green;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px green;
  }
`;
const warning = css`
  background: #ffc107;
  color: black;
  transition: all linear 0.3s;
  border: 1px solid yellow;
  :hover,
  :focus {
    box-shadow: 0px 0px 5px yellow;
  }
`;
const disabled = css`
  cursor: not-allowed;
  opacity: 0.5;
`;

interface ButtonWrapperProps {
  btnType?: string;
  cover?: boolean;
  disabled?: boolean;
  bg?: string;
  m?: string | number[];
  p?: string | number[];
  fontSize?: string;
  transparent?: boolean;
}
export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  ${buttonStyles}

  ${(props) =>
    (props.btnType === "error" && error) ||
    (props.btnType === "success" && success) ||
    (props.btnType === "warning" && warning) ||
    (props.disabled && disabled)}

   
margin: ${(props) =>
    typeof props.m === "string"
      ? props.m
      : typeof props.m === "object" &&
        props.m.length === 4 &&
        `${props.m![0]}px ${props.m![1]}px ${props.m![2]}px ${props.m![3]}px`};
  padding: ${(props) => props.p || "8px 10px"};
  min-width: ${(props) => props.cover && "100%"};
  font-size: ${(props) => props.fontSize || "1rem"};
  ${(props) =>
    props.transparent &&
    css`
      background-color: transparent;
      border: none;
      padding: 0px;
      color: inherit;
      &:hover,
      :focus {
        background-color: transparent;
        opacity: 1;
      }
    `};

  ${(props) => props.disabled && disabled}
`;

export const ButtonAlignment = styled.div<any>`
  display: flex;
  justify-content: ${(props) =>
    (props.align === "center" && "center") ||
    (props.align === "start" && "flex-start") ||
    (props.align === "end" && "flex-end")};
`;

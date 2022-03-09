import styled, { css } from "styled-components";

// ─── SHAREDSTACK ────────────────────────────────────────────────────────────────

type alignType = "flex-start" | "center" | "flex-end";

interface ISharedStackProps {
  spacing?: string;
  cover?: boolean;
  applyBoth?: boolean;
  direction: "row" | "column";
  align?: alignType;
  justify?: alignType | "space-between" | "space-evenly" | "space-around";
}

export const SharedStack = styled.div<ISharedStackProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "column" ? "column" : "row"};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  & > * {
    width: ${(props) => (props.cover ? "100%" : "auto")};
    margin: ${(props) =>
      props.direction === "column"
        ? `${props.spacing} 0`
        : `0 ${props.spacing}`};
  }
`;

// ─── SHARED BOX ─────────────────────────────────────────────────────────────────

interface ISharedBox {
  direction: "row" | "column";
  align?: string;
  justify?: string;
  gap?: string;
  color?: string;
  flex?: boolean;
}

export const SharedBox = styled.div<ISharedBox>`
  display: flex;
  font-size: 0.8rem;
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  gap: ${(props) => props.gap};

  ${(props) =>
    props.flex &&
    css`
      & > * {
        flex: 1;
      }
    `};
`;

export const SharedFeedbackButton = styled.button`
  height: 40px;
  border: solid 3px #cccccc;
  background: #333;
  width: 100px;
  line-height: 32px;
  -webkit-transform: rotate(-90deg);
  font-weight: 600;
  color: white;
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  text-align: center;
  font-size: 17px;
  position: fixed;
  right: -40px;
  top: 45%;
  text-decoration: none;
  font-family: "Roboto", helvetica, arial, sans-serif;
  z-index: 999;
`;

export const SharedErrorText = styled.p`
  color: #ff696e;
  margin-top: 6px;
  padding-left: 10px;
`;

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

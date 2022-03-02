import React from "react";
import { ButtonAlignment, ButtonWrapper } from "./style";

interface ButtonProps {
  children?: React.ReactNode;
  align?: string;
  disabled?: boolean;
  [key: string]: any;
}

export const Button = ({ align, disabled, ...props }: ButtonProps) => {
  return (
    <ButtonAlignment align={align}>
      <ButtonWrapper disabled={disabled} {...props}>
        {props.children}
      </ButtonWrapper>
    </ButtonAlignment>
  );
};

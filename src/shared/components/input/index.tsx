import { SharedBox } from "../styled";
import { InputInnerContainer, InputWrapper, StyledInput } from "./style";

interface InputProps {
  tokenName?: string;
  tokenBalance?: string;
  value?: string;
  cover?: boolean;
  label?: string;
  onChange?: (e: any) => void;
  type?: string;
  onClick?: (e: any) => void;
  min?: number;
}

const Input = ({
  tokenName,
  tokenBalance,
  cover = false,
  label,
  ...props
}: InputProps) => {
  return (
    <InputWrapper>
      <InputInnerContainer>
        <strong>
          <p>{label}</p>
        </strong>
        <strong>
          <p>Balance: {tokenBalance}</p>
        </strong>
      </InputInnerContainer>

      <SharedBox direction="row" align="center">
        <StyledInput placeholder="0.00" cover={cover} {...props} />
        <strong>
          <p>{tokenName}</p>
        </strong>
      </SharedBox>
    </InputWrapper>
  );
};

export default Input;

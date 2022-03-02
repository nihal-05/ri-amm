import styled from "styled-components";

export const InputWrapper = styled.div`
  min-width: 100%;
  background-color: #f4fff8;
  padding: 10px;
  color: black;
  border-radius: 10px;
`;
export const InputInnerContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: rgb(38, 50, 56);
  font-weight: 500;
`;
export const StyledInput = styled.input<{ cover: boolean }>`
  border: none;
  font-size: 1.3rem;
  padding: 5px;

  width: ${(props) => (props.cover ? "90%" : "auto")};
  &:focus {
    outline: none;
  }
`;

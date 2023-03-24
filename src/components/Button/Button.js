import ClickableWrapper from "../ClickableWrapper";
import styled from "styled-components";

const Wrapper = styled.button`
  cursor: pointer;
  transition: all 0.35s ease-in-out;
  background-color: var(--color-moderate-blue);
  border-radius: 8px;
  display: grid;
  place-content: center;
  color: var(--color-white);
  font-weight: var(--font-weight-medium);
  font-size: 18px;
  padding: 12px 36px;
  height: max-content;
  width: max-content;

  transition: all 0.25s ease-in;

  &:focus {
    outline: 3px inset var(--color-dark-blue);
  }

  &:hover {
    background-color: var(--color-light-gray-blue);
    color: var(--color-moderate-blue);
  }
`;

function Button({ children, ...props }) {
  return (
    <ClickableWrapper type="button" tabindex={"0"} {...props}>
      <Wrapper>{children}</Wrapper>
    </ClickableWrapper>
  );
}

export default Button;

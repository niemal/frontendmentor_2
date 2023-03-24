import ClickableWrapper from "../ClickableWrapper";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.35s ease-in-out;
  color: ${(p) =>
    p.active ? "var(--color-light-gray-blue)" : "var(--color-moderate-blue)"};
  cursor: pointer;
  & img {
    transition: all 0.35s ease-in-out;
    object-fit: cover;
    ${(p) =>
      p.active
        ? "filter: invert(80%) sepia(24%) saturate(547%) hue-rotate(201deg) brightness(95%) contrast(96%);"
        : ""}
  }

  &:focus {
    outline: 3px inset
      ${(p) => (p.delete ? "var(--color-pale-red)" : "var(--color-dark-blue)")};
    outline-offset: 3px;
  }

  &:hover {
    color: ${(p) =>
      p.delete ? "var(--color-pale-red)" : "var(--color-dark-blue)"};
  }
`;

function ActionWrapper({ children, ...props }) {
  return (
    <ClickableWrapper type="button" tabindex={"0"} {...props}>
      <Wrapper>{children}</Wrapper>
    </ClickableWrapper>
  );
}

export default ActionWrapper;

import ClickableWrapper from "../ClickableWrapper";
import styled from "styled-components";

const Wrapper = styled.div`
  transition: all 0.5s ease-in-out;
  color: var(--color-moderate-blue);
  cursor: pointer;

  &:active {
    color: var(--color-dark-blue);
  }

  & img {
    object-fit: cover;
    transition: all 0.35s ease-in-out;
  }

  &:focus {
    outline: 3px solid var(--color-light-gray-blue);
    outline-offset: 3px;
  }

  &:hover img {
    filter: invert(21%) sepia(18%) saturate(939%) hue-rotate(171deg)
      brightness(94%) contrast(87%);
  }
`;

function UpvoteDownvote({ children, ...props }) {
  return (
    <ClickableWrapper type="button" tabindex={"0"} {...props}>
      <Wrapper>{children}</Wrapper>
    </ClickableWrapper>
  );
}

export default UpvoteDownvote;

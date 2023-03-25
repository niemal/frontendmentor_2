import styled from "styled-components";
import { useContext } from "react";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  z-index: 999;
  background-color: var(--color-dark-blue-fade);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  color: var(--color-gray-blue);
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  gap: 20px;
  background-color: var(--color-white);
  max-width: 380px;

  border-radius: 8px;
`;

const Title = styled.h2`
  font-weight: var(--font-weight-medium);
  font-size: 20px;
  color: var(--color-dark-blue);
`;

const MainContent = styled.div`
  font-weight: var(--font-weight-regular);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${(p) =>
    p.cancel ? "var(--color-gray-blue)" : "var(--color-soft-red)"};
  color: var(--color-light-gray);
  padding: 10px 28px;
  border-radius: 8px;
  font-weight: var(--font-weight-medium);
  user-select: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:focus {
    outline: 3px inset var(--color-moderate-blue);
  }

  &:hover {
    background-color: ${(p) =>
      p.cancel ? "var(--color-dark-blue)" : "var(--color-pale-red)"};
    ${(p) => (!p.cancel ? "color: var(--color-soft-red);" : "")}
  }
`;

function Modal({ context }) {
  const { modalOn, setModalOn, deleteById } = useContext(context);

  if (!modalOn) {
    return null;
  }

  return (
    <Wrapper>
      <ModalWrapper>
        <Title>Delete comment</Title>
        <MainContent>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </MainContent>
        <ButtonRow>
          <ClickableWrapper
            type="button"
            tabindex={"0"}
            cancel={true}
            onClick={() => {
              setModalOn(false);
            }}
          >
            <Button>NO, CANCEL</Button>
          </ClickableWrapper>
          <ClickableWrapper
            type="button"
            tabindex={"0"}
            onClick={() => {
              deleteById();
            }}
          >
            <Button>YES, DELETE</Button>
          </ClickableWrapper>
        </ButtonRow>
      </ModalWrapper>
    </Wrapper>
  );
}

export default Modal;

import styled, { keyframes, css } from "styled-components";
import { QUERIES } from "../constants";
import { useState, useContext, useEffect, useRef, createContext } from "react";
import { DataContext } from "../MainBody";
import Modal from "../Modal";

const slideIn = keyframes`
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(0%)
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(-150%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const cssSlideDown = css`
  animation: 0.25s ${slideDown} ease-in-out forwards;
`;

const cssSlideIn = css`
  animation: 0.25s ${slideIn} ease-in-out forwards;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  gap: 24px;
  background-color: var(--color-white);
  font-size: ${16 / 16}rem;
  border-radius: 8px;

  transition: all 0.3s ease-in;
  ${(p) => (p.update ? cssSlideDown : "")}
  box-shadow: ${(p) =>
    p.update ? "0px 1px 5px var(--color-moderate-blue)" : "none"};

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column-reverse;
    padding: 12px;
  }
`;

const UpvoteWrapper = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 12px;
  background-color: var(--color-very-light-gray);
  font-weight: var(--font-weight-bold);

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: row;
    width: max-content;
    padding: 10px;
    gap: 16px;
  }
`;

const UpvoteDownvote = styled.div`
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

  &:hover img {
    filter: invert(21%) sepia(18%) saturate(939%) hue-rotate(171deg)
      brightness(94%) contrast(87%);
  }
`;

const VoteDisplay = styled.div`
  color: ${(p) =>
    p.update ? "var(--color-soft-red)" : "var(--color-moderate-blue)"};
  transition: all 0.5s ease-in-out;
  font-weight: var(--font-weight-bold);
  user-select: none;

  filter: ${(p) =>
    p.update ? "drop-shadow(0px 0px 4px var(--color-moderate-blue))" : "none"};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorWhenWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  gap: 12px;
  align-items: center;
  color: var(--color-gray-blue);

  & img {
    object-fit: cover;
    border-radius: 5000px;
  }
`;

const Author = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--color-dark-blue);
`;

const When = styled.span`
  font-weight: var(--font-weight-light);
`;

const YouWrapper = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  gap: 8px;
`;

const YouContainer = styled.span`
  padding: 2px 6px;
  background-color: var(--color-moderate-blue);
  border-radius: 4px;
  color: var(--color-white);
  font-size: ${14 / 16}rem;
  font-weight: var(--font-weight-thin);
`;

const CommentContainer = styled.div`
  line-height: 1.5rem;
  color: var(--color-gray-blue);
  transition: all 0.35s ease-in-out;

  &::selection {
    background-color: var(--color-moderate-blue);
  }
`;

const RepliesWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const RepliesDecor = styled.div`
  min-height: 100%;
  border-left: 2px solid var(--color-light-gray);
  margin-left: 40px;
  padding-right: 40px;

  @media ${QUERIES.phoneAndSmaller} {
    margin-left: 0px;
    padding-right: 12px;
  }
`;

const RepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ActionPanel = styled.div`
  display: ${(p) => (p.top ? "flex" : "none")};
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  align-items: center;

  @media ${QUERIES.phoneAndSmaller} {
    display: ${(p) => (p.top ? "none" : "flex")};
  }
`;

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionWrapper = styled.div`
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

  &:hover {
    color: ${(p) =>
      p.delete ? "var(--color-pale-red)" : "var(--color-dark-blue)"};
  }
`;

const ActionLabel = styled.span`
  font-weight: var(--font-weight-medium);
`;

const ReplyToWrapper = styled.div`
  display: flex;
  align-items: start;
  background-color: var(--color-white);
  gap: 12px;
  padding: 20px;
  border-radius: 8px;

  ${cssSlideIn}

  & img {
    object-fit: cover;
  }

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
    gap: 16px;

    & > img {
      display: none;
    }
    & > div {
      display: none;
    }
  }
`;

const MobileReplyWrapper = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: flex !important;
    justify-content: space-between;
    width: 100%;

    & img {
      display: block !important;
    }
  }
`;

const TextArea = styled.textarea`
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--color-gray-blue);
  width: 100%;
  padding: 12px 20px;
  border-radius: 8px;
  border: 2px solid var(--color-light-gray);
  transition: all 0.25s ease-in;

  &::selection {
    background-color: var(--color-moderate-blue);
  }
  &:focus {
    outline: none;
    border-color: var(--color-moderate-blue);
  }
`;

const Button = styled.div`
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
  &:hover {
    background-color: var(--color-light-gray-blue);
    color: var(--color-moderate-blue);
  }
`;

const UpdateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AtUserName = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--color-moderate-blue);
`;

const ModalContext = createContext();

function Comment({ post, currentUser, ...props }) {
  const [modalOn, setModalOn] = useState(false);

  const { posts, setPosts, setChanged, maxId, setMaxId, userNames } =
    useContext(DataContext);
  const replyRef = useRef(null);
  const updateRef = useRef(null);
  const updateButtonRef = useRef(null);
  const contentRef = useRef(null);
  const newCommentRef = useRef(null);
  const commentRef = useRef(null);
  const [voteCount, setVoteCount] = useState(post.score ?? 0);
  const [replyTo, setReplyTo] = useState(false);
  const [newUpdateVisual, setNewUpdateVisual] = useState(false);
  const [voteChangeVisual, setNewVoteChangeVisual] = useState(false);
  const [updateThis, setUpdateThis] = useState(false);

  const sparkVisual = () => {
    setNewUpdateVisual(true);

    const timer = setTimeout(() => {
      setNewUpdateVisual(false);
    }, 2500);

    return () => clearTimeout(timer);
  };

  const sparkVoteChange = () => {
    setNewVoteChangeVisual(true);

    const timer = setTimeout(() => {
      setNewVoteChangeVisual(false);
    }, 1200);
    setChanged(true);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    sparkVoteChange();
  }, [voteCount]);

  useEffect(() => {
    const search = (id, posts) => {
      for (let i = 0; i < posts.length; i++) {
        if (id === posts[i].id) {
          posts[i].score = voteCount;
          setChanged(true);
          break;
        }

        if (posts[i].replies && posts[i].replies.length > 0) {
          search(id, posts[i].replies);
        }
      }
    };

    search(post.id, posts);
  }, [voteCount]);

  useEffect(() => {
    if (replyTo) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [replyTo]);

  const deleteById = () => {
    let deleted = false;

    const deleteInTree = (id, posts) => {
      if (deleted) {
        return posts;
      }

      let tmp = [];
      for (let i = 0; i < posts.length; i++) {
        if (id === posts[i].id) {
          deleted = true;
          continue;
        }

        if (posts[i]?.replies?.length > 0) {
          posts[i].replies = deleteInTree(id, posts[i].replies);
        }

        tmp.push(posts[i]);
      }

      return tmp;
    };

    const tmp = deleteInTree(post.id, [...posts]);
    setPosts(tmp);
    setChanged(true);
  };

  const createNewComment = (originId, fromUser) => {
    let tmp = [...posts];
    let comment = {
      score: 1,
      id: maxId + 1,
      createdAt: "just now",
      user: fromUser,
      content: replyRef ? replyRef.current.value : newCommentRef.current.value,
      new: true,
      replies: [],
    };

    if (!originId) {
      tmp.push(comment);
    } else {
      const searchAndAdd = (id, posts) => {
        for (let i = 0; i < posts.length; i++) {
          posts[i].new = false;

          if (!posts[i].replies) {
            posts[i].replies = [];
          }

          if (posts[i].replies.length > 0) {
            posts[i].replies = searchAndAdd(id, posts[i].replies);
          }

          if (id === posts[i].id) {
            posts[i].replies.push(comment);
          }
        }

        return posts;
      };

      tmp = searchAndAdd(originId, posts);
    }

    setPosts(tmp);
    setChanged(true);
    setReplyTo(false);
    setMaxId((i) => i + 1);
    replyRef.current.value = "";
  };

  const updateById = (id) => {
    const searchAndUpdate = (id, posts) => {
      for (let i = 0; i < posts.length; i++) {
        posts[i].new = false;

        if (posts[i].id === id) {
          posts[i].content = updateRef.current.value;
          posts[i].new = true;
        }

        if (posts[i]?.replies?.length > 0) {
          posts[i].replies = searchAndUpdate(id, posts[i].replies);
        }
      }

      return posts;
    };

    const newPosts = searchAndUpdate(id, posts);
    setPosts(newPosts);
    setUpdateThis(false);
    setChanged(true);
    sparkVisual();
  };

  useEffect(() => {
    if (updateThis) {
      updateRef.current.value = post.content;
      updateButtonRef.current.scrollIntoView({ behavior: "smooth" });
      updateRef.current.focus();
    }
  }, [updateThis]);

  useEffect(() => {
    if (post.createdAt === "just now") {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (post.new) {
      sparkVisual();
    }
  }, []);

  return (
    <>
      <Wrapper ref={commentRef} update={newUpdateVisual} {...props}>
        <MobileWrapper>
          <UpvoteWrapper>
            <UpvoteDownvote
              onClick={() => {
                setVoteCount((c) => c + 1);
              }}
            >
              <img
                src={`/frontendmentor_2/images/icon-plus.svg`}
                height={12}
                width={12}
                alt={"vote up"}
              />
            </UpvoteDownvote>
            <VoteDisplay update={voteChangeVisual}>{voteCount}</VoteDisplay>
            <UpvoteDownvote
              onClick={() => {
                setVoteCount((c) => c - 1);
              }}
            >
              <img
                src={`/frontendmentor_2/images/icon-minus.svg`}
                height={3}
                width={12}
                alt={"vote down"}
                style={{ marginBottom: "3px" }}
              />
            </UpvoteDownvote>
          </UpvoteWrapper>
          <ActionPanel>
            <ActionWrapper
              active={replyTo}
              onClick={() => {
                setReplyTo((r) => !r);
              }}
            >
              <img
                src={"/frontendmentor_2/images/icon-reply.svg"}
                width={15}
                height={15}
                alt={"reply icon"}
              />
              <ActionLabel>Reply</ActionLabel>
            </ActionWrapper>
            {currentUser.username === post.user.username ? (
              <>
                <ActionWrapper
                  delete={true}
                  onClick={() => {
                    setModalOn(true);
                    document.body.style.overflow = "hidden";
                  }}
                >
                  <img
                    src={"/frontendmentor_2/images/icon-delete.svg"}
                    width={15}
                    height={15}
                    alt={"delete icon"}
                  />
                  <ActionLabel style={{ color: "var(--color-soft-red)" }}>
                    Delete
                  </ActionLabel>
                </ActionWrapper>
                <ActionWrapper
                  active={updateThis}
                  onClick={() => {
                    setUpdateThis((u) => !u);
                  }}
                >
                  <img
                    src={"/frontendmentor_2/images/icon-edit.svg"}
                    width={15}
                    height={15}
                    alt={"edit icon"}
                  />
                  <ActionLabel>Edit</ActionLabel>
                </ActionWrapper>
              </>
            ) : (
              ""
            )}
          </ActionPanel>
        </MobileWrapper>

        <MainContent>
          <TopRow>
            <AuthorWhenWrapper>
              <img
                src={post.user.image.webp.replace("./", "/frontendmentor_2/")}
                width={30}
                height={30}
                alt={"author image"}
              />
              {currentUser.username === post.user.username ? (
                <YouWrapper>
                  <Author>{currentUser.username}</Author>
                  <YouContainer>you</YouContainer>
                </YouWrapper>
              ) : (
                <Author>{post.user.username}</Author>
              )}
              <When>{post.createdAt}</When>
            </AuthorWhenWrapper>

            <ActionPanel top={true}>
              <ActionWrapper
                active={replyTo}
                onClick={() => {
                  setReplyTo((r) => !r);
                }}
              >
                <img
                  src={"/frontendmentor_2/images/icon-reply.svg"}
                  width={15}
                  height={15}
                  alt={"reply icon"}
                />
                <ActionLabel>Reply</ActionLabel>
              </ActionWrapper>
              {currentUser.username === post.user.username ? (
                <>
                  <ActionWrapper
                    delete={true}
                    onClick={() => {
                      setModalOn(true);
                      document.body.style.overflow = "hidden";
                    }}
                  >
                    <img
                      src={"/frontendmentor_2/images/icon-delete.svg"}
                      width={15}
                      height={15}
                      alt={"delete icon"}
                    />
                    <ActionLabel style={{ color: "var(--color-soft-red)" }}>
                      Delete
                    </ActionLabel>
                  </ActionWrapper>
                  <ActionWrapper
                    active={updateThis}
                    onClick={() => {
                      setUpdateThis((u) => !u);
                    }}
                  >
                    <img
                      src={"/frontendmentor_2/images/icon-edit.svg"}
                      width={15}
                      height={15}
                      alt={"edit icon"}
                    />
                    <ActionLabel>Edit</ActionLabel>
                  </ActionWrapper>
                </>
              ) : (
                ""
              )}
            </ActionPanel>
          </TopRow>

          {!updateThis ? (
            <CommentContainer>
              {post.content.split(" ").map((word, idx) => {
                if (userNames.includes(word.replace("@", ""))) {
                  return <AtUserName>{word}</AtUserName>;
                }

                if (idx === post.content.length - 1) {
                  return word;
                }

                return word + " ";
              })}
            </CommentContainer>
          ) : (
            <UpdateWrapper>
              <TextArea ref={updateRef} rows={3} />
              <Button
                ref={updateButtonRef}
                style={{ alignSelf: "end" }}
                onClick={() => {
                  updateById(post.id);
                }}
              >
                UPDATE
              </Button>
            </UpdateWrapper>
          )}
        </MainContent>
      </Wrapper>

      {post.replies && post.replies.length > 0 && !replyTo ? (
        <RepliesWrapper>
          <RepliesDecor />
          <RepliesContainer>
            {post.replies.map((reply) => (
              <Comment
                key={`comment-${reply.id}`}
                post={reply}
                currentUser={currentUser}
              />
            ))}
          </RepliesContainer>
        </RepliesWrapper>
      ) : (
        ""
      )}
      {replyTo ? (
        <ReplyToWrapper>
          <img
            src={currentUser.image.webp.replace("./", "/frontendmentor_2/")}
            width={40}
            height={40}
          />
          <TextArea ref={replyRef} placeholder={"Add a comment..."} rows={3} />
          <Button
            onClick={() => {
              createNewComment(post.id, currentUser);
            }}
          >
            SEND
          </Button>

          <MobileReplyWrapper>
            <img
              src={currentUser.image.webp.replace("./", "/frontendmentor_2/")}
              width={40}
              height={40}
            />
            <Button
              onClick={() => {
                createNewComment(post.id, currentUser);
              }}
            >
              SEND
            </Button>
          </MobileReplyWrapper>
        </ReplyToWrapper>
      ) : (
        ""
      )}

      <ModalContext.Provider value={{ modalOn, setModalOn, deleteById }}>
        <Modal context={ModalContext} />
      </ModalContext.Provider>
    </>
  );
}

export default Comment;

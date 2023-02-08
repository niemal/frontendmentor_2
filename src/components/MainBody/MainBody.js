import Comment from "../Comment";
import styled from "styled-components";
import { QUERIES } from "../constants";
import { useState, createContext, useEffect, useCallback } from "react";

const Wrapper = styled.main`
  padding-top: 36px;
  padding-bottom: 36px;
  width: clamp(730px, 8vw, 1350px);
  display: flex;
  flex-direction: column;
  font-family: var(--font-primary);
  gap: 16px;
  margin: 0 auto;

  @media ${QUERIES.phoneAndSmaller} {
    width: 100%;
    padding: 36px 12px;
  }
`;

export const DataContext = createContext();

function MainBody({ data }) {
  const [posts, setPosts] = useState(data.comments ?? []);
  const [userNames, setUserNames] = useState([]);
  const [changed, setChanged] = useState(false);
  const [maxId, setMaxId] = useState(0);

  const sortCommentsOnScore = useCallback(
    (comments) => {
      let result = comments.sort((a, b) => b.score - a.score);

      for (let i = 0; i < result.length; i++) {
        if (result[i].id > maxId) {
          setMaxId(result[i].id);
        }

        if (result[i].replies && result[i].replies.length > 0) {
          result[i].replies = sortCommentsOnScore(result[i].replies);
        }
      }

      return result;
    },
    [maxId, userNames]
  );

  const fetchUserNames = (comments) => {
    for (let comment of comments) {
      if (!userNames.includes(comment.user.username)) {
        const tmp = [...userNames];
        tmp.push(comment.user.username);
        setUserNames(tmp);
      }

      if (comment.replies && comment.replies.length > 0) {
        fetchUserNames(comment.replies);
      }
    }
  };

  useEffect(() => {
    if (changed) {
      const tmp = sortCommentsOnScore(posts);
      setPosts(tmp);
      setChanged(false);
      fetchUserNames(posts);
    }
  }, [posts, changed, sortCommentsOnScore]);

  useEffect(() => {
    fetchUserNames(posts);
  }, []);

  return (
    <Wrapper>
      <DataContext.Provider
        value={{ posts, setPosts, setChanged, maxId, setMaxId, userNames }}
      >
        {posts && posts.length > 0
          ? posts.map((comm) => (
              <Comment
                key={`comment-${comm.id}`}
                post={comm}
                currentUser={data.currentUser}
              />
            ))
          : ""}
      </DataContext.Provider>
    </Wrapper>
  );
}

export default MainBody;

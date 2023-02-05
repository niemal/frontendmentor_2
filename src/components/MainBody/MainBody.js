import Comment from "../Comment";
import styled from "styled-components";
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
`;

export const DataContext = createContext();

function MainBody({ data }) {
  const [posts, setPosts] = useState(data.comments ?? []);
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
    [maxId]
  );

  useEffect(() => {
    if (changed) {
      const tmp = sortCommentsOnScore(posts);
      setPosts(tmp);
      setChanged(false);
    }
  }, [posts, changed, sortCommentsOnScore]);

  return (
    <Wrapper>
      <DataContext.Provider
        value={{ posts, setPosts, setChanged, maxId, setMaxId }}
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

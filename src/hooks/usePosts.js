import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import marked from "marked";
import sanitazeHtml from "sanitize-html";
import { useMemo } from "react";

const GET_POSTS = gql`
  {
    posts(orderBy: updatedAt_DESC) {
      id
      title
      description
      pictureUrl
      body
      published
      createdAt
      updatedAt
    }
  }
`;

const usePosts = () => {
  let { loading, error, data, refetch } = useQuery(GET_POSTS);

  data = useMemo(() => {
    if (data) {
      return {
        ...data,
        posts: data.posts.map((post) => ({
          ...post,
          sanitazedHtml: sanitazeHtml(marked(post.body)),
        })),
      };
    }
  }, [data]);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { usePosts };

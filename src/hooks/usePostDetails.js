import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import marked from "marked";
import sanitazeHtml from "sanitize-html";

import { useMemo } from "react";

const GET_POST_DETAILS = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      description
      pictureUrl
      body
      published
    }
  }
`;

const usePostDetails = (id) => {
  let { loading, error, data } = useQuery(GET_POST_DETAILS, {
    variables: { id },
  });

  data = useMemo(() => {
    if (data) {
      let sanitazedHtml = sanitazeHtml(marked(data.post.body), {
        allowedTags: [
          "b",
          "i",
          "em",
          "strong",
          "a",
          "ul",
          "li",
          "h3",
          "h1",
          "h2",
        ],
        allowedAttributes: {
          a: ["href"],
        },
        allowedIframeHostnames: ["www.youtube.com"],
      });

      return {
        ...data,
        post: {
          ...data.post,
          sanitazedHtml,
        },
      };
    }
  }, [data]);

  return { loading, error, data };
};

export { usePostDetails };

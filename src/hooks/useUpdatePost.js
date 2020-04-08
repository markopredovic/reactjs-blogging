import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_POST = gql`
  mutation updatePost(
    $id: ID!
    $title: String
    $description: String
    $pictureUrl: String
    $body: String
    $published: Boolean
  ) {
    updatePost(
      data: {
        title: $title
        description: $description
        pictureUrl: $pictureUrl
        body: $body
        published: $published
      }
      id: $id
    ) {
      id
      title
      description
      pictureUrl
      body
      published
    }
  }
`;

const useUpdatePost = () => {
  const [updatePost] = useMutation(UPDATE_POST);

  return {
    updatePost,
  };
};

export { useUpdatePost };

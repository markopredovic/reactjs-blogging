import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $description: String!
    $pictureUrl: String
    $body: String!
    $published: Boolean!
  ) {
    createPost(
      data: {
        title: $title
        description: $description
        pictureUrl: $pictureUrl
        body: $body
        published: $published
      }
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

const useCreatePost = () => {
  const [createPost] = useMutation(CREATE_POST);

  return {
    createPost,
  };
};

export { useCreatePost };

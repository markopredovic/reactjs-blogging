import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;

const useDeletePost = () => {
  const [deletePost] = useMutation(DELETE_POST);

  return {
    deletePost,
  };
};

export { useDeletePost };

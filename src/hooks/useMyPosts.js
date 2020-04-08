import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_MY_POSTS = gql`
  {
    myPosts(orderBy: updatedAt_DESC) {
      id
      title
      description
      pictureUrl
      body
      published
      updatedAt
    }
  }
`;

const useMyPosts = () => {
  const { loading, error, data, refetch } = useQuery(GET_MY_POSTS);

  return {
    loading,
    error,
    data,
    refetch,
  };
};

export { useMyPosts };

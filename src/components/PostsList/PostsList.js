import React, { useEffect } from "react";
import Post from "./Post";
import { usePosts } from "../../hooks/usePosts";

const PostsList = () => {
  const { loading, error, data, refetch } = usePosts();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  let publicPosts = [];

  publicPosts =
    data && data.posts.map((post) => <Post key={post.id} {...post} />);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  return <div>{publicPosts}</div>;
};

export default PostsList;

import React, { useEffect } from "react";
import EditPost from "./EditPost";
import { useMyPosts } from "../../hooks/useMyPosts";

const MyPosts = () => {
  const { loading, error, data, refetch } = useMyPosts();

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (data) refetch();
  }, [data]);

  const handlePostDeleted = () => {
    refetch();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error.message}`;

  const myPosts =
    data &&
    data.myPosts.map((post) => (
      <EditPost key={post.id} {...post} refetchParentList={handlePostDeleted} />
    ));

  return <div>{myPosts}</div>;
};

export default MyPosts;

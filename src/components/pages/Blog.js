import React from "react";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import PostsList from "../PostsList";

const Blog = () => {
  return (
    <Layout>
      <PageTitle title="Blog" />
      <PostsList />
    </Layout>
  );
};

export default Blog;

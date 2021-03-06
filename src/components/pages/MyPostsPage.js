import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import MyPosts from "../PostsList/MyPosts";

const MyPostsPage = () => {
  return (
    <Layout>
      <PageTitle title="Moji postovi" />
      <Button as={Link} to="/posts/new" className="mb-4" size="lg">
        Dodaj Post
      </Button>
      <MyPosts />
    </Layout>
  );
};

export default MyPostsPage;

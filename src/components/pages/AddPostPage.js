import React from "react";
import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/UI/Layout";
import PageTitle from "../PageTitle";
import AddPostForm from "../forms/AddPostForm";
import { Button } from "react-bootstrap";

const AddPostPage = () => {
  const history = useHistory();

  return (
    <Layout>
      <PageTitle title="Add new post" />
      <AddPostForm />
      <Button
        className="mt-4"
        onClick={history.goBack}
        variant="dark"
        size="sm"
      >
        <FaArrowLeft /> Back
      </Button>
    </Layout>
  );
};

export default AddPostPage;

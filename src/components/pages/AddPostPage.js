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
      <PageTitle title="Dodaj novi post" />
      <AddPostForm />
      <Button
        className="mt-4"
        onClick={history.goBack}
        variant="dark"
        size="sm"
      >
        <FaArrowLeft /> Vrati se
      </Button>
    </Layout>
  );
};

export default AddPostPage;

import React from "react";
import { useParams, Link } from "react-router-dom";
import { usePostDetails } from "../../hooks/usePostDetails";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";
import EditPostForm from "../forms/EditPostForm";

const EditPostPage = () => {
  const { id } = useParams();
  const { loading, error, data } = usePostDetails(id);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <Layout>
      <PageTitle title="Edituj Post" />
      <EditPostForm editPostData={data.post} />
      <Button as={Link} to="/my-posts" size="sm" variant="dark">
        <FaArrowLeft /> vrati se
      </Button>
    </Layout>
  );
};

export default EditPostPage;

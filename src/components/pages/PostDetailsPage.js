import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { usePostDetails } from "../../hooks/usePostDetails";
import Layout from "../UI/Layout";
import PageTitle from "../PageTitle";

const PostDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = usePostDetails(id);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <Layout>
      <PageTitle title={data.post.title} />
      {!!data.post.pictureUrl && (
        <div className="mb-4 m-feature-image">
          <img src={data.post.pictureUrl} alt={data.post.title} />
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: data.post.sanitazedHtml }}
        className="mb-3"
      />
      <Button onClick={history.goBack} size="sm" variant="dark">
        <FaArrowLeft /> vrati se
      </Button>
    </Layout>
  );
};

export default PostDetailsPage;

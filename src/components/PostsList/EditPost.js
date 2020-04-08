import React, { useState } from "react";
import { useDeletePost } from "../../hooks/useDeletePost";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import placeholderImage from "../../assets/images/placeholder.png";

const EditPost = ({
  id,
  title,
  updatedAt,
  description,
  pictureUrl,
  refetchParentList,
}) => {
  const [loading, setLoading] = useState(false);
  const { deletePost } = useDeletePost();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deletePost({
        variables: {
          id,
        },
      });
      setLoading(false);
      refetchParentList();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const localeDate = new Date(updatedAt).toLocaleDateString();

  return (
    <div className="d-sm-flex mb-4 p-2 m-post-item">
      <div className="mb-2 mb-sm-0 mr-sm-2 mr-lg-3 mr-xl-4">
        <img src={!!pictureUrl ? pictureUrl : placeholderImage} alt={title} />
      </div>
      <div className="flex-grow-1">
        <small className="text-secondary">{localeDate}</small>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="d-flex justify-content-end w-100 l-actions">
          <Button
            as={Link}
            to={`/posts/${id}`}
            variant="outline-primary"
            className="mr-2"
            size="sm"
          >
            View
          </Button>
          <Button
            as={Link}
            to={`/edit/post/${id}`}
            variant="outline-warning"
            className="mr-2"
            size="sm"
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            onClick={handleDelete}
            className="mr-2"
            size="sm"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

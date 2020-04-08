import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import placeholderImage from "../../assets/images/placeholder.png";

const Post = ({ id, title, updatedAt, description, pictureUrl }) => {
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
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;

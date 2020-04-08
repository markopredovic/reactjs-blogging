import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useDeletePost } from "../../hooks/useDeletePost";

const DeletePostForm = ({ deletePostId }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [postDeleted, setPostDeleted] = useState(false);
  const { deletePost } = useDeletePost();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowConfirmModal(true);
  };

  const handleClose = () => {
    if (postDeleted) {
      history.push("/my-posts");
    } else {
      setShowConfirmModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost({
        variables: {
          id: deletePostId,
        },
      });
      setPostDeleted(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Button variant="danger" type="submit">
          Delete Post
        </Button>
      </Form>
      <Modal show={showConfirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {postDeleted && <Alert variant="success">Post is deleted!</Alert>}
          Are you sure to delete this post?
        </Modal.Body>
        <Modal.Footer>
          {!postDeleted && (
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          )}
          {postDeleted ? (
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          ) : (
            <Button variant="primary" onClick={handleDelete}>
              Yes, delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePostForm;

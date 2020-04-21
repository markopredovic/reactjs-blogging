import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import InlineMessage from "../messages/InlineMessage";
import { useForm } from "../../hooks/useForm";
import { useCreatePost } from "../../hooks/useCreatePost";
import bsCustomFileInput from "bs-custom-file-input";
import { storage } from "../../firebase";

const initialValues = {
  title: "",
  description: "",
  body: "",
  published: false,
};

const AddPostForm = () => {
  const [postData, setData, handleChange] = useForm(initialValues);
  const [postImage, setPostImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createPost } = useCreatePost();

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const _validateForm = () => {
    const _errors = {};

    if (postData.title.trim() === "") {
      _errors.title = "Polje je obavezno";
    }

    if (postData.description.trim() === "") {
      _errors.description = "Polje je obavezno";
    }

    if (postData.body.trim() === "") {
      _errors.body = "Polje je obavezno";
    }

    return _errors;
  };

  const _resetForm = () => {
    setData({
      title: "",
      description: "",
      body: "",
      published: false,
    });
    document.getElementById("addPostForm").reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    const _errors = _validateForm();

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
    } else {
      setShowAlert(false);
      setLoading(true);
      try {
        if (postImage) {
          const uploadTask = storage
            .ref(`postImages/${postImage.name}`)
            .put(postImage);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              // complete function ....
              storage
                .ref("postImages")
                .child(postImage.name)
                .getDownloadURL()
                .then(async (url) => {
                  await createPost({
                    variables: {
                      ...postData,
                      pictureUrl: url,
                    },
                  });
                  setLoading(false);
                  setShowAlert(true);
                  _resetForm();
                });
            }
          );
        } else {
          await createPost({
            variables: {
              ...postData,
              pictureUrl: "",
            },
          });
          setLoading(false);
          setShowAlert(true);
          _resetForm();
        }
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      }
    }
  };

  const handlePostImage = (e) => {
    const postImage = e.target.files[0];
    setPostImage(postImage);
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Post added!
        </Alert>
      )}
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit} id="addPostForm">
        <Form.Group controlId="formBasicText">
          <Form.Label>
            <strong className="m-required">Post naslov</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={postData.title}
            onChange={(e) => handleChange(e)}
            placeholder="Enter title"
          />
          {errors.title && <InlineMessage>{errors.title}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="post.shortDescription">
          <Form.Label>
            <strong className="m-required">Post kraći opis</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Enter short description"
            value={postData.description}
            onChange={(e) => handleChange(e)}
            rows="2"
          />
          {errors.body && <InlineMessage>{errors.description}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="post.image">
          <Form.Label>
            <strong>Post glavna slika</strong>
          </Form.Label>
          <Form.File
            id="custom-file-translate-html"
            label="dodaj sliku"
            data-browse="pretraži"
            custom
            onChange={handlePostImage}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <strong className="m-required">Post sadržaj</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            placeholder="Enter post content"
            value={postData.body}
            onChange={(e) => handleChange(e)}
            rows="10"
          />
          {errors.body && <InlineMessage>{errors.body}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="switch"
            name="published"
            checked={postData.published}
            onChange={(e) => {
              handleChange(e);
            }}
            label="Objavi"
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Dodavanje..." : "Dodaj"}
        </Button>
      </Form>
    </>
  );
};

export default AddPostForm;

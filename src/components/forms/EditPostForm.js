import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useForm } from "../../hooks/useForm";
import InlineMessage from "../messages/InlineMessage";
import { useUpdatePost } from "../../hooks/useUpdatePost";
import bsCustomFileInput from "bs-custom-file-input";
import { FaTimesCircle } from "react-icons/fa";
import { storage } from "../../firebase";

const EditPostForm = ({ editPostData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [postData, setData, handleChange] = useForm(editPostData);
  const [postImage, setPostImage] = useState(null);
  const [pictureExists, setPictureExists] = useState(!!postData.pictureUrl);
  const { updatePost } = useUpdatePost();

  useEffect(() => {
    bsCustomFileInput.init();
  }, [pictureExists]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowAlert(false);
    setErrors({});
    const _errors = _validateForm();

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
    } else {
      try {
        if (
          postData.title !== editPostData.title ||
          postData.description !== editPostData.description ||
          postData.body !== editPostData.body ||
          postData.published !== editPostData.published ||
          postImage ||
          (!postImage &&
            !!editPostData.pictureUrl &&
            document.getElementsByClassName("custom-file-input")[0].value ===
              "")
        ) {
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
                    setLoading(true);
                    await updatePost({
                      variables: {
                        ...postData,
                        pictureUrl: url,
                      },
                    });
                    setLoading(false);
                    setShowAlert(true);
                  });
              }
            );
          } else {
            setLoading(true);
            await updatePost({
              variables: {
                ...postData,
                pictureUrl: !!editPostData.pictureUrl
                  ? ""
                  : editPostData.pictureUrl,
              },
            });
            setLoading(false);
            setShowAlert(true);
          }
        }
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      }
    }
  };

  const handlePostImage = (e) => {
    const _postImage = e.target.files[0];

    setPostImage(_postImage);
  };

  return (
    <>
      {showAlert && <Alert variant="success">Post je ažuriran!</Alert>}
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formBasicText">
          <Form.Label>
            <strong>Izmeni naslov</strong>
          </Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={postData.title}
            onChange={(e) => handleChange(e)}
            placeholder="Unesi naslov"
          />
          {errors.title && <InlineMessage>{errors.title}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="post.shortDescription">
          <Form.Label>
            <strong>Izmeni opis</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={postData.description}
            onChange={(e) => handleChange(e)}
            rows="2"
            placeholder="Unesi tekst"
          />
          {errors.body && <InlineMessage>{errors.description}</InlineMessage>}
        </Form.Group>
        {!pictureExists ? (
          <Form.Group controlId="post.image">
            <Form.Label>
              <strong>Izmeni glavnu sliku</strong>
            </Form.Label>
            <Form.File
              id="custom-file-translate-html"
              label=""
              data-browse="pretraži sliku"
              custom
              onChange={handlePostImage}
            />
          </Form.Group>
        ) : (
          <div className="mb-3">
            <label className="d-block">
              <strong>Izmeni glavnu sliku</strong>
            </label>
            <div className="d-flex align-top">
              <img
                src={editPostData.pictureUrl}
                alt={editPostData.title}
                width="100"
              />
              <span
                className="text-danger"
                onClick={() => setPictureExists(false)}
                style={{ fontSize: "24px" }}
              >
                <FaTimesCircle />
              </span>
            </div>
          </div>
        )}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>
            <strong>Izmeni sadržaj</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            value={postData.body}
            onChange={(e) => handleChange(e)}
            rows="10"
          />
          {errors.body && <InlineMessage>{errors.body}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox" className="mb-4">
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
          {loading ? "Izmena..." : "Izmeni"}
        </Button>
      </Form>
    </>
  );
};

export default EditPostForm;

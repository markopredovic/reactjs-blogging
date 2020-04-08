import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useSignUpUser } from "../../hooks/useSignUpUser";
import { useForm } from "../../hooks/useForm";
import InlineMessage from "../messages/InlineMessage";
import { isEmail } from "validator";
import AppContext from "../../context/appContext";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const { signUpUser } = useSignUpUser();
  const [credentials, handleChange] = useForm(initialValues);

  const _validateForm = () => {
    const _errors = {};

    if (credentials.name.trim() === "") {
      _errors.name = "Field is required";
    }

    if (!isEmail(credentials.email)) {
      _errors.email = "Not valid email address";
    }
    if (credentials.password.length < 8) {
      _errors.password = "Password must be 8 characters long or more";
    }

    return _errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    const _errors = _validateForm();

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
    } else {
      try {
        const response = await signUpUser({
          variables: {
            ...credentials,
          },
        });

        context.userLoggedIn(response.data.createUser);
        history.push("/my-posts");
      } catch (e) {
        const graphqlError = e.message.replace("GraphQL error: ", "");
        setErrors({ graphqlError });
      }
    }
  };

  return (
    <>
      {!!errors.graphqlError && (
        <Alert variant="danger">{errors.graphqlError}</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTest">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <InlineMessage>{errors.name}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={(e) => handleChange(e)}
          />
          {errors.email && <InlineMessage>{errors.email}</InlineMessage>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => handleChange(e)}
          />
          {errors.password && <InlineMessage>{errors.password}</InlineMessage>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;

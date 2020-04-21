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
  const [loading, setLoading] = useState(false);

  const { signUpUser } = useSignUpUser();
  const [credentials, setData, handleChange] = useForm(initialValues);

  const _validateForm = () => {
    const _errors = {};

    if (credentials.name.trim() === "") {
      _errors.name = "Polje je obavezno";
    }

    if (!isEmail(credentials.email)) {
      _errors.email = "Email adresa nije validna";
    }
    if (credentials.password.length < 8) {
      _errors.password = "Šifra mora da bude duga 8 ili više karaktera duga";
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
        setLoading(true);
        const response = await signUpUser({
          variables: {
            ...credentials,
          },
        });

        context.userLoggedIn(response.data.createUser);
        setLoading(false);
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
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesi ime"
            name="name"
            value={credentials.name}
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <InlineMessage>{errors.name}</InlineMessage>}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email adresa</Form.Label>
          <Form.Control
            type="email"
            placeholder="Unesi email"
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
            placeholder="Šifra"
            value={credentials.password}
            onChange={(e) => handleChange(e)}
          />
          {errors.password && <InlineMessage>{errors.password}</InlineMessage>}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Registrovanje..." : "Registruj se"}
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;

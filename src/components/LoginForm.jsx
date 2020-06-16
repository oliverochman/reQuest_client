import React, { useState } from "react";
import { Button, Form, Input, Container } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const login = async (e) => {
    try {
      const response = await auth.signIn(
        e.target.email.value,
        e.target.password.value
      );
      if (response.success) {
        dispatch({
          type: "SET_AUTHENTICATED",
          payload: {
            authenticated: response.success,
            uid: response.data.uid,
          },
        });
        history.push("/requests");
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  return (
    <Container className="form-container">
      <h3 style={{ color: "white" }} id="error-message">
        {errorMessage}
      </h3>
      <Form unstackable id="login-form" onSubmit={login}>
        <h1>{"Log in"}</h1>
        <h4>{"Email"}</h4>
        <Input name="email" type="email" id="email"></Input>
        <h4>{"Password"}</h4>
        <Input name="password" type="password" id="password"></Input>
        <Button id="submit">{"Submit"}</Button>
      </Form>
    </Container>
  );
};
export default LoginForm;

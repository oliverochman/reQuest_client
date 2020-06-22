import React, { useState, useEffect } from "react";
import { Form, Input, Container } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "RESET_ACTIVE_PAGE" });
  }, [dispatch]);

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
        dispatch({
          type: "GET_KARMA",
          payload: {
            karma: response.data.karma_points,
          },
        });
        history.push("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  return (
    <div id="page-container">
      <Container className="form-container">
        <h3 className="input-labels" id="error-message">
          {errorMessage}
        </h3>
        <Form id="login-form" onSubmit={login}>
          <h1 className="input-labels">{"Log in"}</h1>
          <h4 className="input-labels">{"Email"}</h4>
          <Form.Input name="email" type="email" id="email"></Form.Input>
          <h4 className="input-labels">{"Password"}</h4>
          <Form.Input
            name="password"
            type="password"
            id="password"
          ></Form.Input>
          <Input type="submit" value="Submit" id="submit-btn" />
        </Form>
      </Container>
    </div>
  );
};
export default LoginForm;

import React, { useState } from "react";
import { Form, Input, Container } from "semantic-ui-react";
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
        history.push("/");
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  return (
    <Container className="form-container">
      <h3 className='input-labels' id="error-message">
        {errorMessage}
      </h3>
      <Form id="login-form" onSubmit={login}>
        <h1 className='input-labels' >{"Log in"}</h1>
        <h4 className='input-labels' >{"Email"}</h4>
        <Form.Input name="email" type="email" id="email"></Form.Input>
        <h4 className='input-labels' >{"Password"}</h4>
        <Form.Input name="password" type="password" id="password"></Form.Input>
        <Input type="submit" value="Submit" id="submit-btn"/>
      </Form>
    </Container>
  );
};
export default LoginForm;

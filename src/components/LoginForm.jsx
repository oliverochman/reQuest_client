import React, { useState } from "react";
import { Grid, Button, Form, Input } from "semantic-ui-react";
import { auth } from "../modules/auth";
// import { useHistory } from "react-router-dom";
// import "../css/index.css";
// import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

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
        })
      
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors[0]);
    }
  };

  return (
    <>
      <Grid className="login-container" verticalAlign="middle">
        <Grid.Column align="center">
          <h3 style={{ color: "black" }} id="error-message">
            {errorMessage}
          </h3>
          <Form unstackable id="login-form" onSubmit={login}>
            <h1>{"Log in"}</h1>
            <h4>{"Email"}</h4>
            <Input name="email" type="email" id="email"></Input>
            <h4>{"Password"}</h4>
            <Input name="password" type="password" id="password"></Input>
            <br></br>
            <Button id="submit">{"Submit"}</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default connect()(LoginForm);

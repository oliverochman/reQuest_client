import React, { useState } from "react";
import { Grid, Button, Form, Input } from "semantic-ui-react";
import { auth } from "../modules/auth";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../App.css';

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
    <>
      <Grid id='login-grid' >
        <Grid.Column className="login-container" align="center">
          <h3 className='input-labels' style={{ color: "white" }} id="error-message">
            {errorMessage}
          </h3>
          <Form  id="login-form" onSubmit={login}>
            <h1 className='input-labels'>Log in</h1>
            <h4 className='input-labels'>Email</h4>
            <Input name="email" type="email" id="email"></Input>
            <h4 className='input-labels'>Password</h4>
            <Input name="password" type="password" id="password"/><br/>
            <Button id="submit">Submit</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};
export default LoginForm;

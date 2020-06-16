import React, { useState } from "react";
import { Form, Input, Container } from "semantic-ui-react";
import axios from "axios";
import createHeaders from "../modules/headers";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const NewRequest = () => {
  const [message, setMessage] = useState("");
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  const submitRequest = async (e) => {
    try {
      const response = await axios.post(
        "/api/requests",
        {
          title: e.target.title.value,
          description: e.target.description.value,
        },
        { headers: createHeaders() }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <>
      {!authenticated ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Container className="form-container">
          <h1>{"New reQuest"}</h1>
          <Form id="newRequest-form" onSubmit={(e) => submitRequest(e)}>
            <Form.Input
              id="title"
              name="Title"
              type="text"
              placeholder="reQuest Title"
            />
            <Form.TextArea
              id="description"
              name="Description"
              placeholder="reQuest Description"
              type="textarea"
            />
            <Input
              id="submit"
              type="submit"
              value="Submit"
              rows="5"
              cols="40"
              required
            />
          </Form>
          <p id="message">{message}</p>
        </Container>
      )}
    </>
  );
};

export default NewRequest;

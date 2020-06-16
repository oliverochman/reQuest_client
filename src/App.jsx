import React from "react";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom";
import NewRequest from "./components/NewRequest";
import "./App.css";

const App = () => {
  return (
    <>
      <h1>
        <span id="re">re</span>
        Quest
      </h1>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/requests" component={NewRequest} />
      </Switch>
    </>
  );
};

export default App;

import React from "react";
import LoginForm from "./components/LoginForm";
import { Switch, Route } from "react-router-dom";
import NewQuest from "./components/NewQuest";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/newquests" component={NewQuest} />
    </Switch>
  );
};

export default App;

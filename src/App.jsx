import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AllQuests from "./components/AllQuests";

function App() {
  return (
    <>
      <Header></Header>
      <Switch>
        <Route exact path="/" component={AllQuests}></Route>
      </Switch>
    </>
  );
}

export default App;

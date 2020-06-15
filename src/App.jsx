import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AllQuests from "./components/AllQuests";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={AllQuests}></Route>
      </Switch>
    </>
  );
}

export default App;

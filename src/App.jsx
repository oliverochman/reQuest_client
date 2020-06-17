import React from "react";
import { Switch, Route } from "react-router-dom";
import BrowseRequests from "./components/BrowseRequests";
import Header from "./components/Header";
import NewRequest from "./components/NewRequest";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={BrowseRequests}></Route>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/myrequest" component={NewRequest} />
      </Switch>
    </>
  );
}

export default App;

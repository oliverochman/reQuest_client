import React from "react";
import { Switch, Route } from "react-router-dom";
import AllRequests from "./components/AllRequests";
import Header from "./components/Header";
import NewRequest from "./components/NewRequest";
import LoginForm from "./components/LoginForm";
import "./App.css";
import MyRequestsPage from "./components/MyRequestsPage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={AllRequests}></Route>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/myrequest" component={NewRequest} />
        <Route exact path="/myrequest/requests" component={MyRequestsPage} />
      </Switch>
    </>
  );
}

export default App;

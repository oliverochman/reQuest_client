import React from "react";
import { Switch, Route } from "react-router-dom";
import BrowseRequests from "./components/BrowseRequests";
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
        <Route exact path="/" component={BrowseRequests}></Route>
        <Route exact path="/login" component={LoginForm} />
        
        <Route exact path="/myrequest/newrequest" component={NewRequest} />
        <Route exact path="/myrequest/requests" component={MyRequestsPage} />
      </Switch>
    </>
  );
}

export default App;

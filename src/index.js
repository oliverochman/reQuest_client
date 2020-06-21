import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./state/store/configureStore";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const store = configureStore();
axios.defaults.baseURL = "http://localhost:3000/api";

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

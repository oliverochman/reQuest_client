import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import configureStore from './state/store/configureStore';
import axios from 'axios';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseUrl = "http://localhost:3001/api";
const store = configureStore();


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import configureStore from './state/store/configureStore';
import axios from 'axios';
import * as serviceWorker from "./serviceWorker";

axios.defaults.baseUrl = "http://localhost:3001/api";
const store = configureStore();


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

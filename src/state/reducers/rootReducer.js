import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import authenticationReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  requests: requestReducer,
  authentication: authenticationReducer,
});

export default rootReducer;

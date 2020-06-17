import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import authenticationReducer from "./authenticationReducer";
import karmaReducer from "./karmaReducer"

const rootReducer = combineReducers({
  karma: karmaReducer,
  requests: requestReducer,
  authentication: authenticationReducer,
});

export default rootReducer;

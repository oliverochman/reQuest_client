import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import authenticationReducer from "./authenticationReducer";
import karmaReducer from "./karmaReducer"
import activePageReducer from './activePageReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
  karma: karmaReducer,
  requests: requestReducer,
  authentication: authenticationReducer,
  pages: activePageReducer,
  coords: locationReducer 
});

export default rootReducer;

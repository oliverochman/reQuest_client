import { combineReducers } from "redux";
import questsReducer from "./articleReducer";

const rootReducer = combineReducers({
  quests: questsReducer,
});

export default rootReducer;

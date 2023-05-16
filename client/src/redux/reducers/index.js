import { combineReducers } from "redux";
// eslint-disable-next-line
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
});

export default myReducers;

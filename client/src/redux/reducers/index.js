import { combineReducers } from "redux";
// eslint-disable-next-line
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import { productReducer } from "./productReducers";
import allUsersReducer from "./allUsersReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUsersReducer,
});

export default myReducers;

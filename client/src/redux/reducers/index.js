import { combineReducers } from "redux";
// eslint-disable-next-line
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import { productReducer } from "./productReducers";
import allUsersReducer from "./allUsersReducer";
import { cartReducer } from "./cartReducer";
import { displayCartReducer } from "./displayCartReducer";
import { orderReducer } from "./orderReducer";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
  allUsers: allUsersReducer,
  cartItems: cartReducer,
  isCart: displayCartReducer,
  orders: orderReducer,
});

export default myReducers;

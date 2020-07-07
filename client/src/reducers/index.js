import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  items: itemReducer,
  user: userReducer,
  admin: adminReducer,
});

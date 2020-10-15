import { createStore, combineReducers } from "redux";
import { locationsReducer } from "./location/locationReducer";

export default createStore(
  combineReducers({
    locations: locationsReducer,
  }),
);
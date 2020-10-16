import { createStore, combineReducers } from "redux";
import { locationsReducer } from "./location/locationsReducer";
import { productsReducer } from "./product/productsReducer";

export default createStore(
  combineReducers({
    locations: locationsReducer,
    products: productsReducer,
  }),
);
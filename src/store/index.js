import { createStore, combineReducers } from "redux";
import { locationsReducer } from "./locations/locationsReducer";
import { productsReducer } from "./products/productsReducer";
import { categoriesReducer } from "./categories/categoriesReducer";

export default createStore(
  combineReducers({
    locations: locationsReducer,
    products: productsReducer,
    categories: categoriesReducer,
  }),
);
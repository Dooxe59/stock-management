import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { locationsReducer } from './locations/locationsReducer';
import { productsReducer } from './products/productsReducer';
import { categoriesReducer } from './categories/categoriesReducer';

export default createStore(
  combineReducers({
    locations: locationsReducer,
    products: productsReducer,
    categories: categoriesReducer,
  }), composeWithDevTools(applyMiddleware(thunk)),
);

